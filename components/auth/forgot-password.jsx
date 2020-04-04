import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';;
import { Form } from '../../form-kit2';
import { Input } from '../ui';
import SubmitMessage, { messageToSubmit } from './submit-message';


const ForgotPassword = () => {

  const router = useRouter();

  const handleSubmit = async ({ email }) => {
    try {
      await Auth.forgotPassword(email);
      router.push('/forgot-password-verification');
    } catch(error) {
      return messageToSubmit(error.message);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        required
      />
      <SubmitMessage />
      <div>
        <button>Submit</button>
      </div>
    </Form>
  );
}

export default ForgotPassword;