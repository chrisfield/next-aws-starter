import React from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { Form } from '../../form-kit2';
import { Input } from '../ui';
import SubmitMessage, { messageToSubmit } from './submit-message';
import { passwordsMatch } from './validate';

const ForgotPasswordVerification = () => {

  const router = useRouter();

  const handleSubmit = async ({ email, verificationCode, password }) => {
    try {
      await Auth.forgotPasswordSubmit(email, verificationCode, password);
      router.push('/');
    } catch(error) {
      return messageToSubmit(error.message);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="email"
        placeholder="Email"
        required
      />
      <Input
        name="verificationCode"
        placeholder="Verification Code"
        required
      />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        required
      />
      <Input
        name="repeatPassword"
        placeholder="Repeat password"
        type="password"
        spy={(values) => (values.password)}
        validate={passwordsMatch}
      />
      <SubmitMessage />
      <div>
        <button>Submit</button>
      </div>
    </Form>
  );
}

export default ForgotPasswordVerification;