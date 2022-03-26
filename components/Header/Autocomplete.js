import Link from 'next/link';
import Image from 'next/image';

export default function Autocomplete(props) {
  return (
    <div className='relative z-50'>
      <div className='absolute w-full top-0 left-0'>
        <ul className='bg-white overflow-hidden border rounded-lg shadow-xl border-gray-300'>
          {props.results.map((result) => {
            const id = String(result.id);
            return (
              <li className='flex justify-start items-center px-1 m-0 hover:bg-slate-200' key={id}>
                <Link href={`/pokemon/${id}`}>
                  <a className='flex items-center'>
                    <Image src={result.sprites.front_default} alt='pokemon image' width={54} height={54}></Image>
                    <span className='pl-2 text-md font-bold text-ellipsis whitespace-nowrap'>{result.name}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
