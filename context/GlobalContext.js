import { useState, useEffect, useContext, useMemo, createContext } from 'react';

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    console.log('global use effect', user);
  }, [user]);

  const values = useMemo(
    () => ({
      user,
      setUser
    }),
    [user]
  );

  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>;
};

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) console.error('Error creating Global Context');
  return context;
}

export default useGlobalContext;
