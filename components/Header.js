import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@nextui-org/react';
import LoginHeader from './LoginHeader';

export default function Header() {
  return (
    <Container className='py-8' display='flex' justify='space-between' alignItems='center' responsive>
      <Link href='/'>
        <a>
          <Image src='https://fontmeme.com/permalink/220323/4adf4c238f1ea2bc99680b1460eaeac2.png' alt='logo-pokegen' width={256} height={75}></Image>
        </a>
      </Link>

      <LoginHeader></LoginHeader>
    </Container>
  );
}
