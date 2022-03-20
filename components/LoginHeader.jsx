import Button from 'components/Button';
import Github from './Icons/Github';
import { Avatar } from '@nextui-org/react';
import { Text } from '@nextui-org/react';
import { onAuthStateChanges } from '../firebase/client';
import { useState, useEffect } from 'react';

export default function LoginHeader() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanges(setUser);
  }, []);

  const handleClick = async () => {
    const user = await loginWithGithub();
    setUser(user);
  };

  return (
    <div className="flex items-center">
      {user === null && (
        <Button onClick={handleClick}>
          <Github />
          Login with Github
        </Button>
      )}

      {user && user.avatar && (
        <>
          <div className="mr-3">
            <Avatar src={user.avatar} size="lg" zoomed />
          </div>
          <Text size={20} weight={'bold'}>
            {user.name}
          </Text>
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
