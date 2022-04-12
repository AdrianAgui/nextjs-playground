import Link from 'next/link';
import Image from 'next/image';

export default function Autocomplete(props) {
  return (
    <div className='relative z-50'>
      <div className='absolute w-full top-0 left-0'>
        <div className='bg-white overflow-hidden border rounded-lg shadow-xl border-gray-300'>
          {props.results.map((result) => {
            const {
              id,
              name,
              sprites: { front_default }
            } = result;
            return (
              <div className='px-2 m-0 hover:bg-slate-200' key={id}>
                <Link href={`/pokemon/${id}`}>
                  <a className='flex items-center'>
                    <Image src={front_default} alt={`Image for ${name}`} width={54} height={54}></Image>
                    <span className='pl-4 text-md font-bold text-ellipsis whitespace-nowrap'>{name}</span>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
