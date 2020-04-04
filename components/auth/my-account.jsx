import React from 'react';
import { Auth } from 'aws-amplify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useApp } from '../app';

const MyAccount = () => {

  const { user, setUser } = useApp();
  const router = useRouter();
  
  if (!user) {
    return null;
  }

  const { username, attributes: {email} } = user;
  const handleLogout = async e => {
    e.preventDefault();
    try {
      Auth.signOut();
    }  catch (error) {
      console.error(error);
    }
    setUser(null);
    router.push('/');
  };
  return (
    <div>
      <p>
        username: {username}
      </p>
      <p>
        email: {email}
      </p>
      <p>
        <Link href='/change-password'>
          <a>Change password</a>
        </Link>
      </p>
      <p>
        <a href="#" onClick={handleLogout}>
          Log out
        </a>
      </p>
    </div>
  );
};

export default MyAccount;
