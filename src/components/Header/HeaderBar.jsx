import Link from 'next/link';
import Image from 'next/image';

import LoginHeader from 'src/components/Header/LoginHeader';
import Searcher from 'src/components/Header/Searcher';
import TypeSelector from './TypeSelector';

import { useRouter } from 'next/router';

export default function HeaderBar() {
  const router = useRouter();

  return (
    <>
      <div className='flex flex-col min-h-[175px] md:flex-row items-center justify-between p-8'>
        <Link href='/'>
          <a>
            <Image src='/logo.png' alt='logo-pokegen' width={256} height={75} title='this will be displayed as a tooltip'></Image>
          </a>
        </Link>

        <div className='flex items-center mt-8 md:mt-0'>
          <Searcher />
          {router.pathname.includes('grid') && <TypeSelector />}
        </div>

        <div className='mt-8 md:mt-0'>
          <LoginHeader></LoginHeader>
        </div>
      </div>
    </>
  );
}
