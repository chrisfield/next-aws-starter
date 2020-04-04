import React from 'react';
import Link from 'next/link';
import { useApp } from '../';

const User = () => {
  const { user } = useApp();
  if ( user ) {
    return (
      <Link href="/my-account">
        <a>Hello: {user.username}</a>
      </Link>
    );
  }
  return (
    <div>
      My Account
      <ul>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default User;
