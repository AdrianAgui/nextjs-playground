import Link from 'next/link';
import Image from 'next/image';
import Button from 'components/Button';
import { Container } from '@nextui-org/react';
import Github from './Icons/Github';
import { Avatar } from '@nextui-org/react';
import { loginWithGithub, onAuthStateChanges } from '../firebase/client';
import { useState, useEffect } from 'react';
import { Text } from '@nextui-org/react';

export default function Header() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanges(setUser);
  }, []);

  const handleClick = async () => {
    const user = await loginWithGithub();
    setUser(user);
  };

  return (
    <Container as="header" className="py-8" display="flex" justify="space-between" alignItems="center" responsive>
      <Link href="/">
        <a>
          <Image
            src="https://fontmeme.com/permalink/220307/6ebe5c4201b070a3a0b1390fbba584ac.png"
            alt="fuente-pokemon"
            width={190}
            height={70}
          ></Image>
        </a>
      </Link>

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
            <div>
              <Text size={20} weight={'bold'}>
                {user.name}
              </Text>
            </div>
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
    </Container>
  );
}
