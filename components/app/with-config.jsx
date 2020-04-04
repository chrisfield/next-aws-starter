import React, { useEffect } from 'react';
import { useApp } from './';
const withConfig = (
    { hideUserInToolbar=false }
) => {
  return (Component) => (
    (props) => {

      const { setHideUserInToolbar } = useApp();
      useEffect(() => {
        if (hideUserInToolbar) {
          setHideUserInToolbar(true);
          return () => {setHideUserInToolbar(false)};
        }
      }, []);
      return <Component {...props}/>
    }
  );
};

export default withConfig;
