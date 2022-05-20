import { memo } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import css from 'styles/MyTeam.module.scss';

function Slot({ pokemon }) {
  return (
    <div key={pokemon.id} className='relative'>
      <div className={pokemon.id && css.teamMate}>
        {pokemon && pokemon.id ? (
          <Link href={`pokemon/${pokemon.id}`}>
            <a>
              <Image src={pokemon.imageURL} alt={pokemon.name} className='z-10' width={150} height={150} />
            </a>
          </Link>
        ) : (
          <div style={{ width: '150px', height: '150px' }} />
        )}

        <div className='absolute top-0 left-0'>
          <div className={css.pokeball}></div>
        </div>
      </div>
    </div>
  );
}

export default memo(Slot);
