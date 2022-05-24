import Link from 'next/link';

import { useRouter } from 'next/router';
import { useI18n } from 'core/context/i18nContext';

import SpanishFlag from './../Icons/Flags/Spanish';
import EnglishFlag from './../Icons/Flags/English';

export default function LangsSelector() {
  const { pathname, locales } = useRouter();
  const { translator } = useI18n();

  return (
    <nav className='ml-14'>
      <ul className='flex'>
        {locales.map((locale) => {
          return (
            <li id={locale} key={locale} className='ml-1' title={translator(`language.${locale}`)}>
              <Link locale={locale} href={pathname}>
                <a>{locale === 'es' ? <SpanishFlag /> : <EnglishFlag />}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
