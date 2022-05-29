import { useRef, useState } from 'react';

import 'animate.css';

import capitalize from 'core/utils/capitalize';
import useOutsideClick from 'core/hooks/useOutsideClick';

export default function MyPokemonModal({ pokemon, setOpenModal }) {
  const [closing, setClosing] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setOpenModal(false));

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setOpenModal(false);
      setClosing(false);
    }, 400);
  };

  return (
    <div className='relative z-20' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed z-10 inset-0 overflow-y-auto'>
        <div className='flex justify-center min-h-full text-center p-0'>
          <div
            ref={wrapperRef}
            className={`flex flex-col justify-between relative bg-white sm:rounded-lg rounded-none text-left overflow-hidden shadow-xl sm:my-32 sm:max-w-2xl sm:w-full animate__animated animate__fadeInLeft animate__faster 
            ${closing ? 'animate__animated animate__fadeOutRight animate__faster' : ''}`}
          >
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <h1 className='text-3xl font-semibold text-gray-900' id='modal-title'>
                    {capitalize(pokemon.name)}
                  </h1>
                  <div className='flex mt-2 w-100'>
                    <section className='w-50'>Info</section>
                    <section className='w-50'>
                      <span className='text-gray-600'>#{pokemon.id}</span>
                      <img src={pokemon.imageURL_art} alt={`Image for ${pokemon.name}`} />
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              {/* <button
                type='button'
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
              >
                Deactivate
              </button> */}
              <button
                type='button'
                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
