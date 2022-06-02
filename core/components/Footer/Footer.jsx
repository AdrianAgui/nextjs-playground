import { useI18n } from 'core/context/i18nContext';

export default function Footer() {
  const { translator } = useI18n();

  return (
    <div className='flex justify-center w-100 p-8 bg-white font-semibold'>
      {translator('createdby')}&nbsp;
      <a
        href='https://adrianagui.rocks/'
        target='_blank'
        className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'
        rel='noreferrer'
      >
        Adrián Aguirre
      </a>
      <span>&nbsp;{translator('with')}&nbsp;</span>
      <a href='https://nextjs.org/' target='_blank' className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' rel='noreferrer'>
        {translator('nextjs')}
      </a>
    </div>
  );
}
