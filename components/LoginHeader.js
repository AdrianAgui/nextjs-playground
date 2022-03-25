import Github from './Icons/Github';
import Google from './Icons/Google';
import { Avatar, Text, Button, Loading, Spacer } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { login, mapUserFromFirebaseAuth, logout, onAuthStateChanges } from '../firebase/client';
import { LOGIN_TYPE } from 'utils/constants';

export default function LoginHeader() {
  const [user, setUser] = useState(undefined);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [typeLogin, setTypeLogin] = useState(null);

  useEffect(() => {
    onAuthStateChanges(setUser);
  }, []);

  const handleLoginClick = (loginType) => {
    setLoadingLogin(true);
    setTypeLogin(loginType);

    login(loginType)
      .then((userEvent) => {
        const user = userEvent.user ? userEvent.user : userEvent;
        const normalizedUser = mapUserFromFirebaseAuth(user);
        setUser(normalizedUser);
        setLoadingLogin(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingLogin(false);
      });
  };

  const handleLogoutClick = () => {
    logout()
      .then(() => setUser(null))
      .catch((error) => {
        console.error(error);
        setLoadingLogin(false);
      });
  };

  return (
    <div className='flex items-center'>
      {user === null && (
        <>
          {!loadingLogin && (
            <div className='flex flex-col'>
              <Button padding={32} className='bg-slate-100' shadow onClick={() => handleLoginClick(LOGIN_TYPE.GOOGLE)}>
                <div className='flex items-center'>
                  <Google className='mr-1' />
                  <span className='text-black'>Login with Google</span>
                </div>
              </Button>

              <Spacer y={0.5} />

              <Button padding={32} className='bg-slate-900' shadow onClick={() => handleLoginClick(LOGIN_TYPE.GITHUB)}>
                <div className='flex items-center'>
                  <Github className='mr-1' />
                  <span>Login with Github</span>
                </div>
              </Button>
            </div>
          )}

          {loadingLogin && typeLogin === LOGIN_TYPE.GOOGLE && (
            <Button clickable={false} padding={32} className='bg-slate-100' shadow>
              <Loading color='white' size='sm' />
            </Button>
          )}

          {loadingLogin && typeLogin === LOGIN_TYPE.GITHUB && (
            <Button clickable={false} padding={32} className='bg-slate-900' shadow>
              <Loading color='white' size='sm' />
            </Button>
          )}
        </>
      )}
      {user && (
        <>
          <div className='mr-3'>
            <Avatar src={user.avatar} size='lg' zoomed />
          </div>
          <Text size={20} weight={'bold'}>
            {user.name}
          </Text>
          <button className='ml-3 text-lg' onClick={handleLogoutClick}>
            ❌
          </button>
        </>
      )}
    </div>
  );
}
