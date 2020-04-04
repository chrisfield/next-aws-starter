import React from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Form } from '../../form-kit2';
import { Input } from '../../components/ui';
import { useApp } from '../../components/app';
import SubmitMessage, { messageToSubmit } from './submit-message';

const Login = () => {

  const router = useRouter();
  const { setUser } = useApp();

  const handleSubmit = async ({ username, password }) => {
    try {
      const user = await Auth.signIn(
        username,
        password
      );
      console.log('signInResponse', user);
      setUser(user);
      router.push('/');
    } catch(error) {
      setUser();
      return messageToSubmit(error.message);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="username"
        placeholder="Username"
        required
      />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        required
      />
      <SubmitMessage />
      <div>
        <button>Login</button>
      </div>
      <div>
        <Link href="/forgot-password">
          <a>Forgot password?</a>
        </Link>
      </div>
    </Form>
  );
}

export default Login;
