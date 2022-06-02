import { useRouter } from 'next/router';
import { useI18n } from 'core/context/i18nContext';
import capitalize from 'core/utils/capitalize';

export default function InfoTable({ pokemon }) {
  const { locale } = useRouter();
  const { translator } = useI18n();

  return (
    <dl>
      <div className='flex justify-between bg-white px-6 py-6'>
        <dt className='text-sm font-medium text-gray-500'>{translator('info.id')}</dt>
        <dd className='flex justify-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>#{pokemon.id}</dd>
      </div>
      <div className='flex justify-between bg-gray-100 px-6 py-6'>
        <dt className='text-sm font-medium text-gray-500'>{translator('info.trainer')}</dt>
        <dd className='flex justify-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{pokemon.trainer}</dd>
      </div>
      <div className='flex justify-between bg-white px-6 py-6'>
        <dt className='text-sm font-medium text-gray-500'>{translator('info.catch')}</dt>
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
      <div className='flex justify-between bg-gray-50 px-6 py-6'>
        <dt className='text-sm font-medium text-gray-500'>{translator('info.type')}</dt>
        <dd className='flex justify-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
          {pokemon.type.length > 0 && pokemon.type.map((type) => <span key={type}>{capitalize(type)}&nbsp;</span>)}
        </dd>
      </div>
      <div className='flex justify-between bg-white px-6 py-6'>
        <dt className='text-sm font-medium text-gray-500'>{translator('info.weight')}</dt>
        <dd className='flex justify-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{pokemon.weight} kg</dd>
      </div>
      <div className='flex justify-between bg-gray-50 px-6 py-6'>
        <dt className='text-sm font-medium text-gray-500'>{translator('info.height')}</dt>
        <dd className='flex justify-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{pokemon.height} m</dd>
      </div>
    </dl>
  );
}
