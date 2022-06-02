import Link from 'next/link';

import { useRouter } from 'next/router';
import { useI18n } from 'core/context/i18nContext';
import { useState, useEffect } from 'react';

import { TOTAL_POKEMON } from './../../utils/constants';

export default function Paginator({ id }) {
  const { locale } = useRouter();
  const { translator } = useI18n();

  const [hasPrev, setHasPrev] = useState(false);
  const [prevId, setPrevId] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const { prevId, nextId, hasPrev, hasNext } = pagination(id);
    setHasPrev(hasPrev);
    setPrevId(prevId);
    setHasNext(hasNext);
    setNextId(nextId);
  }, [id]);

  return (
    <div className='flex justify-between font-bold'>
      <span className='flex justify-start'>
        {hasPrev && (
          <Link locale={locale} href={`/pokemon/${prevId}`}>
            <a>⏮️ {translator('previous')}</a>
          </Link>
        )}
      </span>

      <span className='flex justify-end '>
        {hasNext && (
          <Link locale={locale} href={`/pokemon/${nextId}`}>
            <a>{translator('next')} ⏭️</a>
          </Link>
        )}
      </span>
    </div>
  );
}

function pagination(id) {
  return {
    prevId: +id - 1,
    nextId: +id + 1,
    hasPrev: +id - 1 > 0,
    hasNext: +id + 1 <= TOTAL_POKEMON
  };
}
