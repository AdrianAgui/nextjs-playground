import { memo } from 'react';
import Image from 'next/image';

import capitalize from 'core/utils/capitalize';

import { pokeTypes } from './pokeTypes';

function TypeSelector({ onSelect }) {
  return (
    <div className='origin-top-right absolute right-0 mt-3 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
      <div className='inline-grid gap-2 grid-cols-4 p-4'>
        {pokeTypes.map(({ key, image }) => (
          <div key={key} className='hover:bg-gray-300 cursor-pointer p-1 w-12 h-12 rounded-3xl' onClick={() => onSelect(key)}>
            <Image src={image} alt={key} width={40} height={40} layout='fixed' title={capitalize(key)}></Image>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(TypeSelector);
