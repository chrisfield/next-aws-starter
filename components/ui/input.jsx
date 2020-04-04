import { Field } from '../../form-kit2';

const FieldInput = ({
    label,
    touched,
    error,
    name,
    id=name,
    handleBlur,
    handleChange,
    placeholder,
    ...props
  }) => {
    return (
      <div>
        <label htmlFor={id}>{placeholder}: </label>
        <input
          id={id}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          {...props}
        />
        { error && touched &&
          <div>
            {error}
          </div>
        }
      </div>
    );
  };

  const requiredStr = (value, _values, { placeholder, label }) => (
    value ? undefined: `${label || placeholder} is required`
  );
  
  const composeValidators = (...validators) => (value, values, props) =>
    validators.reduce((error, validator) => error || validator(value, values, props), undefined);

  const noop = () => (undefined);
  
  const Input = ({required, validate=noop, ...props}) => {
    
    const validators = [ validate ];
    if (required) {
      validators.unshift(requiredStr);
    }

    return (
      <Field 
        Component={FieldInput}
        validate={composeValidators(...validators)}
        {...props}
      />
    );
  }

  export default Input;
