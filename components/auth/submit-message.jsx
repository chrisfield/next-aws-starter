import React from 'react';
import { FormSpy } from '../../form-kit2';

export const messageToSubmit = message => ({ submitErrorMessage: message });

const submitErrorMessageSelector = state => (state.formErrors.submitErrorMessage)

const SubmitMessage = () => (
  <FormSpy selector={submitErrorMessageSelector}>
    {(message) => {
        return <div>{message}</div>
    }}
  </FormSpy>
)

export default SubmitMessage;
