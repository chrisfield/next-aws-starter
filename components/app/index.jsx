import Amplify, { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react';
import getConfig from '../../get-config.js';
import Toolbar from './toolbar';

export { default as withConfig } from './with-config';

const config = getConfig();

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

const App = ({ children }) => {
  const [ user, setUser ] = useState();
  const [ hideUserInToolbar, setHideUserInToolbar ] = useState(false);
  const { pathname } = useRouter();
  console.log('pathname',pathname);
  useEffect(() => {
    (async () => {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setUser(user);
      }  
    })();
  }, []);
  return (
    <AppContext.Provider value={{
      user,
      setUser,
      setHideUserInToolbar
    }}>
      <>
        <Toolbar hideUser={hideUserInToolbar} />
        { children }
      </>
    </AppContext.Provider>
  );
};

export default App;
