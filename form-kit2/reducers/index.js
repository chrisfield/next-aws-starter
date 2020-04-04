import getField from '../state-utils/get-field';
import setField from '../state-utils/set-field';
import { actionTypes } from '../actions';

export const initialFormState = {
  formStatus: {
    errorCount: 0
  },
  fieldValues:{},
  fieldStatus:{},
  formErrors: {}
}

const reducer = (state, action) => {
  const {formStatus, fieldStatus} = statusReducer(state.formStatus, state.fieldStatus, action);
  return { 
    formStatus,
    fieldValues: fieldValuesReducer(state.fieldValues, action),
    fieldStatus,
    formErrors: formErrorsReducer(state.formErrors, action)
  }
};

export default reducer;

const fieldValuesReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FIELD:
      return setField(state, action.field, action.value);
    default:
      return state;
  }
};

const statusReducer = (formStatus, fieldStatus, action) => {
  switch (action.type) {
    case actionTypes.SET_FIELD_ERROR: {
      const field = getField(fieldStatus, action.field) || {};
      return {
        fieldStatus: setField(fieldStatus, action.field, { ...field, error: action.error}),
        formStatus: {...formStatus, errorCount: formStatus.errorCount + (action.error ? 1 : 0) - (field.error ? 1 : 0)},
      }
    }
    case actionTypes.SET_FIELD_TOUCHED: {
      const field = getField(fieldStatus, action.field) || {};
      return {
        fieldStatus: setField(fieldStatus, action.field, {error: field.error, touched: action.touched}),
        formStatus,
      };
    }
    default:
      return { formStatus, fieldStatus };
  }
};


const formErrorsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.START_SUBMIT:
      return {};
    case actionTypes.STOP_SUBMIT:
      return action.formErrors || {};
    default:
      return state;
  }
};