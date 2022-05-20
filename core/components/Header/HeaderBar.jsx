import Logo from './Logo';
import LoginHeader from 'core/components/Header/LoginHeader';
import Searcher from 'core/components/Header/Searcher';
import TypeSelector from './TypeSelector/TypeSelector';

import { useRouter } from 'next/router';

export default function HeaderBar() {
  const router = useRouter();

  return (
    <>
      <div className='flex flex-col min-h-[175px] md:flex-row items-center justify-between p-8'>
        <Logo width={220} height={70} />

        <div className='flex items-center mt-8 md:mt-0'>
          <Searcher />
          {router.pathname.includes('grid') && <TypeSelector />}
        </div>

        <div className='mt-8 md:mt-0'>
          <LoginHeader />
        </div>
      </div>
    </>
  );
}
