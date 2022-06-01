import { useState } from 'react';

import Image from 'next/image';
import TitleEditable from './TitleEditable';
import LevelProgress from './LevelProgress';
import InfoTable from './InfoTable';

export default function MyPokemon({ pokemon }) {
  const [name, setName] = useState(pokemon.name);

  return (
    <div className='bg-white'>
      <div className='text-center sm:text-left'>
        <div className='flex items-center p-5 bg-gray-100'>
          <img
            className='bg-white inline-block h-16 w-16 rounded-full ring-2 ring-offset-2 ring-opacity-50 ring-black mr-7'
            src={pokemon.imageURL}
            alt={`Image for ${pokemon.name}`}
          />
          <TitleEditable id={pokemon.id} name={name} setName={setName} />
        </div>

        <div className='flex flex-col sm:flex-row'>
          <section className='w-full sm:w-1/2 font-semibold border-r-2'>
            <InfoTable pokemon={pokemon} />
          </section>

          <section className='flex flex-col w-full sm:w-1/2 mt-5'>
            <LevelProgress level={pokemon.level} />
            <picture className='p-6 sm:p-12'>
              <Image src={pokemon.imageURL_art} alt={`Image for ${pokemon.name}`} width={240} height={240} layout='responsive'></Image>
            </picture>
          </section>
        </div>
      </div>
    </div>
  );
}