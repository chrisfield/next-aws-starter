import React, { useReducer, createContext, useContext, useRef } from 'react';
import { default as reducer, initialFormState } from './reducers';
import { stopSubmit, startSubmit } from './actions';

export const FormContext = createContext();

export const useForm = () => {
  return useContext(FormContext);
};

const Form = ({
    onSubmit,
    children
  }) => {
  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const fieldsRef = useRef([]);
  const registerField = field => {
    fieldsRef.current.push(field);
  };
  const deregisterField = (field) => {
    const index = fieldsRef.current.indexOf(field);
    if (index > -1) {
      fieldsRef.current.splice(index, 1);
    }
  };
  const markAllFieldsAsTouched = (touched= true) => {
    fieldsRef.current.forEach((field) => {
      field.setTouched(touched);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    markAllFieldsAsTouched();
    if (formState.formStatus.errorCount === 0) {
      dispatch(startSubmit());
      const submitError = await onSubmit(formState.fieldValues);
      dispatch(stopSubmit(submitError));
    }
  };
  return (
    <FormContext.Provider value={{
      formState,
      dispatch,
      registerField,
      deregisterField
    }}>
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export default Form;
