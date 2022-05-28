import Link from 'next/link';

import { useRouter } from 'next/router';
import { useI18n } from 'core/context/i18nContext';
import { useEffect, useState } from 'react';

import SpanishFlag from './../Icons/Flags/Spanish';
import EnglishFlag from './../Icons/Flags/English';

export default function LangsSelector() {
  const { pathname, locales, query } = useRouter();
  const { translator } = useI18n();
  const [path, setPath] = useState(pathname);

  useEffect(() => {
    !pathname.includes('[id]') ? setPath(pathname) : setPath(pathname.replace('[id]', query.id));
  }, [query]);

  return (
    <nav className='ml-14'>
      <ul className='flex'>
        {locales.map((locale) => {
          return (
            <li id={`${locale}-lang-changer`} key={locale} title={translator(`language.${locale}`)} className='ml-1'>
              <Link locale={locale} href={path}>
                <a>{locale === 'es' ? <SpanishFlag /> : <EnglishFlag />}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
