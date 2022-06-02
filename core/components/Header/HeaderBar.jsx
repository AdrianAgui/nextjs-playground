import { useRouter } from 'next/router';

import Logo from './Logo';
import LoginHeader from 'core/components/Header/LoginHeader';
import Searcher from 'core/components/Header/Searcher';
import LangsSelector from './LangsSelector';

import dynamic from 'next/dynamic';

const TypeSelectorPopUp = dynamic(() => import('./TypeSelector/TypeSelectorPopUp'));

export default function HeaderBar() {
  const router = useRouter();

  return (
    <>
      <div className='flex flex-col min-h-[175px] md:flex-row items-center justify-between p-8'>
        <Logo width={220} height={70} />

        <div className='flex items-center mt-8 md:mt-0'>
          <Searcher />
          {router.pathname.includes('grid') && <TypeSelectorPopUp />}
        </div>

        <div className='flex items-center mt-8 md:mt-0'>
          <LoginHeader />
          <LangsSelector />
        </div>
      </div>
    </>
  );
}
