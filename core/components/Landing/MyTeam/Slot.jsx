import { memo } from 'react';

import Image from 'next/image';
import css from 'styles/MyTeam.module.scss';

function Slot({ pokemon }) {
  return (
    <div key={pokemon.id} className=''>
      <div className='relative'>
        {pokemon.id ? (
          <Image src={pokemon.imageURL} alt={pokemon.name} className='z-10' width={150} height={150} />
        ) : (
          <div style={{ width: '150px', height: '156px' }} />
        )}
        <div className='absolute top-0 left-0'>
          <div className={css.pokeball}></div>
        </div>
      </div>
    </div>
  );
}

export default memo(Slot);
