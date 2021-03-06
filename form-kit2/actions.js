export const actionTypes = {
  DEREGISTER_FIELD: "DEREGISTER_FIELD",
  INIT_FORM_STATE: "INIT_FORM_STATE",
  PUSH_TO_FIELD_ARRAY: "PUSH_TO_FIELD_ARRAY",
  REMOVE_FROM_FIELD_ARRAY: "REMOVE_FROM_FIELD_ARRAY",
  SET_FIELD_ERROR: "SET_FIELD_ERROR",
  SET_FIELD_TOUCHED: "SET_FIELD_TOUCHED",
  START_SUBMIT: "START_SUBMIT",
  STOP_SUBMIT: "STOP_SUBMIT",
  UPDATE_FIELD: "UPDATE_FIELD",
  UPDATE_FIELDS: "UPDATE_FIELDS",
  RESET_FIELDS_IS_DONE: "RESET_FIELDS_IS_DONE"
};

export const initFormState = (
  {formStatus= {}, fieldStatus= {}, fieldValues= {}, formErrors= {}}= {},
) => ({type: actionTypes.INIT_FORM_STATE, formStatus, fieldStatus, fieldValues, formErrors});

export const resetFieldsIsDone = () => (
  {type: actionTypes.RESET_FIELDS_IS_DONE}
);

// field
export const updateField = (value, customProps) => (
  {type: actionTypes.UPDATE_FIELD, value, customProps}
);

export const updateFields = (fieldValues) => (
  {type: actionTypes.UPDATE_FIELDS, fieldValues}
);

//field
export const setFieldError = (error) => (
  {type: actionTypes.SET_FIELD_ERROR, error}
);

//field
export const setFieldTouched = (touched) => (
  {type: actionTypes.SET_FIELD_TOUCHED, touched}
);

//fieldArray
export const pushToFieldArray = (payload) => (
  {type: actionTypes.PUSH_TO_FIELD_ARRAY, payload}
);

//fieldArray
export const removeFromFieldArray = (index) => (
  {type: actionTypes.REMOVE_FROM_FIELD_ARRAY, index}
);

//field
export const deregisterField = () => (
  {type: actionTypes.DEREGISTER_FIELD}
);

//form
export const startSubmit = () => (
  {type: actionTypes.START_SUBMIT}
);

export const stopSubmit = (formErrors) => (
  {type: actionTypes.STOP_SUBMIT, formErrors}
);
