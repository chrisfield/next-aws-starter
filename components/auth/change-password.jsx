import React from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { Form } from '../../form-kit2';
import { Input } from '../ui';
import { useApp } from '../app';
import SubmitMessage, { messageToSubmit } from './submit-message';
import { passwordsMatch } from './validate';

const ChangePassword = () => {

  const { user } = useApp();
  const router = useRouter();

  const handleSubmit = async ({ password, newPassword }) => {
    try {
      await Auth.changePassword(user, password, newPassword);
      router.push('/')
    } catch(error) {
      return messageToSubmit(error.message);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="password"
        placeholder="Password"
        type="password"
        required
      />
      <Input
        name="newPassword"
        placeholder="New password"
        type="password"
        required
      />
      <Input
        name="repeatNewPassword"
        placeholder="Repeat new password"
        type="password"
        spy={(values) => (values.newPassword)}
        validate={passwordsMatch}
      />
      <SubmitMessage />
      <div>
        <button>Submit</button>
      </div>
    </Form>
  );
}

export default ChangePassword;