import Link from 'next/link';

export default function PokeGridLink() {
  return (
    <picture className='relative p-1'>
      <Link href={'/pokemon/grid'}>
        <a>
          <div className='relative'>
            <div className='absolute top-2 right-0 pt-3 pr-3 z-10'>
              <img
                src='https://fontmeme.com/permalink/220424/af343c7eda574560881bd55f2deaa2d9.png'
                alt='fuente-pokemon'
                border='0'
                className='rotate-6'
              />
            </div>
            <img src='/pokegrid-link.png' alt='pokegrid-link' />
          </div>
        </a>
      </Link>
    </picture>
  );
}
