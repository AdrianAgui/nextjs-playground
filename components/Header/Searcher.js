import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LIMIT_SEARCH } from './../../utils/constants';

export default function Searcher() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  const handleChange = async () => {
    const q = searchRef.current?.value;

    const queryResultsFetched = await fetch(`/api/search?q=${q}&limit=${LIMIT_SEARCH}`);
    const queryResults = await queryResultsFetched.json();
    setResults(queryResults);
  };

  return (
    <div className='searcher'>
      <input
        className='px-5 py-3 text-md border border-gray-400 rounded-3xl'
        type='search'
        ref={searchRef}
        onChange={handleChange}
        placeholder='Search pokemon...'
      />
      <div className='relative z-50'>
        {Boolean(results.length) && (
          <div className='absolute w-full top-0 left-0'>
            <ul className='bg-white overflow-hidden border rounded-lg shadow-xl border-gray-300'>
              {results.map((result) => {
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
        )}
      </div>
    </div>
  );
}
