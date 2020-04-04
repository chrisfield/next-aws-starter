import React, { useMemo, useEffect, useRef } from 'react';
import { useForm } from './form';
import {
  updateField as updateFieldAction,
  setFieldError as setFieldErrorAction,
  setFieldTouched as setFieldTouchedAction
} from './actions';

function usePrevious(value) {
  const ref = useRef({});
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const noop = () => (undefined);
const defaultStatus = {};

export const Field = ({
  name,
  formatFromStore,
  spy=noop,
  ...props
}) => {
  const { formState, dispatch, registerField, deregisterField } = useForm();
  const dispatchForField = (action) => {
    dispatch({field: name, ...action });
  };
  const { fieldValues, fieldStatus } = formState; 
  const status = fieldStatus[name] || defaultStatus;
  const value = fieldValues[name];
  const values = spy(fieldValues);

  useEffect(() => {
    const thisField = {
      name,
      setTouched: touched => dispatchForField(setFieldTouchedAction(touched))
    };
    registerField(thisField);
    return () => {
      deregisterField(thisField);
    }
  }, []);

  return useMemo(() => {
    return (
      <ConnectedField
        {...props}
        name={name}
        value={value}
        values={values}
        dispatch={dispatchForField}
        status={status}
      />
    )
  }, [value, values, status, dispatch, name, ...Object.keys(props), ...Object.values(props)]);
};

const ConnectedField = ({
  name,
  Component,
  value,
  values,
  status,
  validate,
  dispatch,
  formatFromStore,
  ...props
}) => {
  const { error, touched } = status;
  const isMounted = useRef(false);
  const previous = usePrevious({value, values});
  useEffect(() => {
    const isValidationDue = !isMounted.current || value !== previous.value || values !== previous.values;
    if (!isMounted.current) {
      isMounted.current = true;
    }
    if (isValidationDue) {
      const validationResult = validate(value, values, {name, formatFromStore, ...props});
      if (validationResult !== error) {
        dispatch(setFieldErrorAction(validationResult));  
      }
    }
  });
  const handleChange = (e) => {
    dispatch(updateFieldAction(e.target.value));
  };
  console.log(`Render ${name}`);
  return (
    <ConnectedFieldComponent
      handleChange={handleChange}
      name={name}
      value={formatFromStore(value)}
      touched={touched}
      error={error}
      Component={Component}
      {...props}
    />
  )
};

ConnectedField.defaultProps = {
  formatFromStore: (value = "") => value,
  validate: noop
};

const ConnectedFieldComponent = ({Component, ...props}) => {
  if (typeof Component === "object" || typeof Component === "function") {
    return <Component {...props}/>;
  }
  const {
    handleBlur,
    handleChange,
    touched,
    error,
    elementRef,
    ...otherProps} = props;
  return React.createElement(
    Component,
    {onBlur: handleBlur, onChange: handleChange, ref: elementRef, ...otherProps}
  );
}
