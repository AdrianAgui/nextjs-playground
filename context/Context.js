import { useState, useEffect, useContext, useMemo, createContext } from 'react';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(false);

  useEffect(() => {}, []);

  const values = useMemo(
    () => ({
      userData,
      setUserData
    }),
    [userData]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    console.error('Error creating App Context');
  }

  return context;
}

export default useAppContext;
