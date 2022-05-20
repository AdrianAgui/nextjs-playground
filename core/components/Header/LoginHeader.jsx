import Github from '../Icons/Github';
import Google from '../Icons/Google';
import { useState, useEffect, memo } from 'react';
import { login, mapUserFromFirebaseAuth, logout, onAuthStateChanges } from 'core/firebase/auth';
import { LOGIN_TYPE } from 'core/utils/constants';
import { useGlobalContext } from 'core/context/GlobalContext';
import { Avatar, Button, Spinner, Text } from '@chakra-ui/react';

function LoginHeader() {
  const { user, setUser } = useGlobalContext();

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [typeLogin, setTypeLogin] = useState(null);

  useEffect(() => {
    onAuthStateChanges().then(setUser);
  }, [setUser]);

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
    setLoadingLogin(true);

    logout()
      .then(() => {
        setUser(null);
        setLoadingLogin(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingLogin(false);
      });
  };

  return (
    <div className='flex items-center'>
      {user === null && (
        <>
          <div className='flex flex-row md:flex-col'>
            <Button
              as='button'
              className='mb-3'
              size='lg'
              bg='#E2E8F0'
              _hover={{ bg: '#E2E8F0aa' }}
              isLoading={loadingLogin && typeLogin === LOGIN_TYPE.GOOGLE}
              spinner={<Spinner color='black' size='md' />}
              onClick={() => handleLoginClick(LOGIN_TYPE.GOOGLE)}
            >
              <div className='flex items-center'>
                <Google className='mr-1' />
                <span className='text-gray-800 text-sm hidden lg:block'>Login with Google</span>
              </div>
            </Button>

            <Button
              as='button'
              className='ml-3 md:ml-0'
              size='lg'
              bg='#0F172A'
              _hover={{ bg: '#0F172Add' }}
              isLoading={loadingLogin && typeLogin === LOGIN_TYPE.GITHUB}
              spinner={<Spinner color='white' size='md' />}
              onClick={() => handleLoginClick(LOGIN_TYPE.GITHUB)}
            >
              <div className='flex items-center'>
                <Github className='mr-1' />
                <span className='text-white text-sm hidden lg:block'>Login with Github</span>
              </div>
            </Button>
          </div>
        </>
      )}

      {user && (
        <>
          <Avatar src={user.avatar} size='md' />
          <Text as='span' className='ml-3 font-semibold' fontSize='20px'>
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

export default memo(LoginHeader);
