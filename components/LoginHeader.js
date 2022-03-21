import Button from 'components/Button';
import Github from './Icons/Github';
import { Avatar } from '@nextui-org/react';
import { Text } from '@nextui-org/react';
import { onAuthStateChanges } from '../firebase/client';
import { useState, useEffect } from 'react';
import { loginWithGithub, logout, mapUserFromFirebaseAuth } from '../firebase/client';

export default function LoginHeader() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanges(setUser);
  }, []);

  const handleLoginClick = async () => {
    loginWithGithub()
      .then((userEvent) => {
        const user = userEvent.user ? userEvent.user : userEvent;
        const normalizedUser = mapUserFromFirebaseAuth(user);
        setUser(normalizedUser);
      })
      .catch((error) => console.error(error));
  };

  const handleLogoutClick = async () => {
    logout()
      .then(() => setUser(null))
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex items-center">
      {user === null && (
        <Button onClick={handleLoginClick}>
          <Github />
          Login with Github
        </Button>
      )}

      {user && (
        <>
          <div className="mr-3">
            <Avatar src={user.avatar} size="lg" zoomed />
          </div>
          <Text size={20} weight={'bold'}>
            {user.name}
          </Text>
          <button className="ml-3 text-lg" onClick={handleLogoutClick}>
            ❌
          </button>
        </>
      )}

      {user === undefined && (
        <>
          <div className="mr-3">
            <Avatar src={null} size="lg" zoomed />
          </div>
          <div>
            <Text size={20} weight={'bold'}>
              Loading...
            </Text>
          </div>
        </>
      )}
    </div>
  );
}
