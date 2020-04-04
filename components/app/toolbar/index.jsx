import React from 'react';
import Logo from './logo';
import User from './user';

const Toolbar = ({ hideUser }) => (
  <nav> Toolbar here <Logo /> {!hideUser && <User />} </nav>
)

export default Toolbar;
