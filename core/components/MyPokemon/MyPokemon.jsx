import Image from 'next/image';
import TitleEditable from './TitleEditable';
import LevelProgress from './LevelProgress';
import { useRouter } from 'next/router';

export default function MyPokemon({ pokemon }) {
  const { locale } = useRouter();

  console.log(pokemon);
  return (
    <>
      <div className='bg-white'>
        <div className='text-center sm:text-left'>
          <div className='flex items-center p-5 bg-gray-100'>
            <img
              className='inline-block h-16 w-16 rounded-full ring-2 ring-offset-2 ring-opacity-50 ring-black mr-6'
              src={pokemon.imageURL}
              alt={`Image for ${pokemon.name}`}
            />
            <TitleEditable name={pokemon.name} />
          </div>

          <div className='flex'>
            <section className='w-1/2 font-semibold border-r-2'>
              <dl>
                <div className='bg-white px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Identification</dt>
                  <dd className='flex justify-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>#{pokemon.id}</dd>
                </div>
                <div className='bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Trainer</dt>
                  <dd className='flex justify-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{pokemon.trainer}</dd>
                </div>
                <div className='bg-white px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Catch date</dt>
                  <dd className='flex justify-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {new Date(pokemon.catchDate).toLocaleString(locale, {
                      hour: '2-digit',
                      minute: '2-digit',
                      year: 'numeric',
                      month: '2-digit',
                      day: 'numeric'
                    })}
                  </dd>
                </div>
              </dl>
            </section>
            <section className='flex flex-col w-1/2 mt-5'>
              <LevelProgress level={pokemon.level} />
              <picture className='p-12'>
                <Image src={pokemon.imageURL_art} alt={`Image for ${pokemon.name}`} width={240} height={240} layout='responsive'></Image>
              </picture>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
