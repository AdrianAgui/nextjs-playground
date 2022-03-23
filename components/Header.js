import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@nextui-org/react';
import LoginHeader from './LoginHeader';

export default function Header() {
  return (
    <Container className='py-8' display='flex' justify='space-between' alignItems='center' responsive>
      <Link href='/'>
        <a>
          <Image
            src='https://fontmeme.com/permalink/220307/6ebe5c4201b070a3a0b1390fbba584ac.png'
            alt='fuente-pokemon'
            width={190}
            height={70}
          ></Image>
        </a>
      </Link>

      <LoginHeader></LoginHeader>
    </Container>
  );
}
