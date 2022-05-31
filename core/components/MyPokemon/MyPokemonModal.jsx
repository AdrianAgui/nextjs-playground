import 'animate.css';

import { useI18n } from 'core/context/i18nContext';
import useModalActions from '../../hooks/useModalActions';
import MyPokemon from './MyPokemon';

export default function MyPokemonModal({ pokemon, setOpenModal }) {
  const { translator } = useI18n();
  const { wrapperRef, closing, closeModal } = useModalActions(setOpenModal);

  return (
    <div className='relative z-20' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed z-10 inset-0 overflow-y-auto'>
        <div className='flex justify-center text-center p-0'>
          <div
            ref={wrapperRef}
            className={`flex flex-col justify-between relative bg-white sm:rounded-lg rounded-none text-left overflow-hidden shadow-xl sm:my-32 sm:max-w-2xl sm:w-full animate__animated animate__fadeInLeft animate__faster 
            ${closing ? 'animate__animated animate__fadeOutRight animate__faster' : ''}`}
          >
            <MyPokemon pokemon={pokemon} />

            <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                type='button'
                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={closeModal}
              >
                {translator('close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
