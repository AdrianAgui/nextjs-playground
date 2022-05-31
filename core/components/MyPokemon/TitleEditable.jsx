import capitalize from 'core/utils/capitalize';
import Pencil from './../Icons/Pencil';

export default function TitleEditable({ name }) {
  return (
    <>
      <h1 className='text-2xl font-bold text-gray-600' id='modal-title'>
        {capitalize(name)}
      </h1>
      <span className='ml-2 cursor-pointer'>
        <Pencil />
      </span>
    </>
  );
}
