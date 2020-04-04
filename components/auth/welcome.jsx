import React from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Form } from '../../form-kit2';
import { Input } from '../ui';
import SubmitMessage, { messageToSubmit } from './submit-message';

const Welcome = () => {
  const router = useRouter();
  const { query: { username, email } } = router;
  const handleSubmit = async ({ code }) => {
    try {
      await Auth.confirmSignUp(username, code);
      router.push('/');
    } catch(error) {
      return messageToSubmit(error.message);
    }
  };
  return (
    <section>
      <h1>Welcome!</h1>
      <p>You have successfully registered a new account (email address {email}).</p>
      <p>Please check your email and click on the confirmation link</p>
      <div>
        <Link href="/login">
          <a>Login here</a>
        </Link>
      </div>
      <div>
        <Link href="/">
          <a>Continue to home page</a>
        </Link>
      </div>

      <p>or enter the code here:</p>
      <Form onSubmit={handleSubmit}>
        <Input
          name="code"
          placeholder="Code"
          required
        />
        <SubmitMessage />
        <div>
          <button>Submit</button>
        </div>
      </Form>
    </section>
  );
};

export default Welcome;
