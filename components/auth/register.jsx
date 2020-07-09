import React from 'react';
import { Auth } from 'aws-amplify';
import Router from 'next/router';
import { Form } from '../../form-kit2';
import { Input } from '../ui';
import SubmitMessage, { messageToSubmit } from './submit-message';
import { passwordsMatch } from './validate';

const Register = () => {

  const handleSubmit = async ({ username, password, email }) => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      Router.push({pathname: '/welcome', query: { username, email }});
    } catch(error) {
      return messageToSubmit(error.message);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      Enter you info:
      <Input
        name="username"
        id="login-username"
        placeholder="Username"
        required
      />
      <Input
        name="email"
        id="login-email"
        placeholder="Email"
        required
      />
      <Input
        name="password"
        id="login-password"
        placeholder="Password"
        type="password"
        required
      />
      <Input
        name="repeatPassword"
        id="login-password2"
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

export default Register;