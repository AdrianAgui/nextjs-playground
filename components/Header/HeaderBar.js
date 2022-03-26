import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@nextui-org/react';
import LoginHeader from 'components/Header/LoginHeader';
import Searcher from 'components/Header/Searcher';

export default function HeaderBar() {
  return (
    <Container className='py-8' display='flex' justify='space-between' alignItems='center' responsive>
      <Link href='/'>
        <a>
          <Image src='/logo.png' alt='logo-pokegen' width={256} height={75}></Image>
        </a>
      </Link>

      <Searcher />

      <LoginHeader></LoginHeader>
    </Container>
  );
}
