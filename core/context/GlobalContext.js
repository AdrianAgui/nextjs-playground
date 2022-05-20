import { useState, useEffect, useContext, useMemo, createContext } from 'react';

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [pokeType, setPokeType] = useState('');
  const [myTeam, setMyTeam] = useState([]);

  useEffect(() => {}, [user, pokeType]);

  const values = useMemo(
    () => ({
      user,
      setUser,
      pokeType,
      setPokeType,
      myTeam,
      setMyTeam
    }),
    [user, pokeType, myTeam]
  );

  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>;
};

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) console.error('Error creating Global Context');
  return context;
}

export default useGlobalContext;
