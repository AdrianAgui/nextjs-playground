import Link from 'next/link';

import { useRouter } from 'next/router';

import SpanishFlag from './../Icons/Flags/Spanish';
import EnglishFlag from './../Icons/Flags/English';

export default function LangsSelector() {
  const { locales } = useRouter();

  return (
    <>
      <nav className='ml-14'>
        <ul className='flex'>
          {locales.map((locale) => {
            return (
              <li id={locale} key={locale} className='ml-1' title='caca'>
                <Link locale={locale} href='/'>
                  <a>{locale === 'es' ? <SpanishFlag /> : <EnglishFlag />}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
