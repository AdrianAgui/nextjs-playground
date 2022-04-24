import Link from 'next/link';

export default function PokedexLink() {
  return (
    <picture className='relative p-1'>
      <Link href={'/pokedex'}>
        <a>
          <div className='relative'>
            <div className='absolute top-2 right-0 pt-3 pr-3 z-10'>
              <img
                src='https://fontmeme.com/permalink/220424/bb097de84348bb5e8545f8a04be2ebab.png'
                alt='fuente-pokemon'
                border='0'
                className='rotate-6'
              />
            </div>
            <img src='/pokedex-link.png' alt='pokedex-link' />
          </div>
        </a>
      </Link>
    </picture>
  );
}
