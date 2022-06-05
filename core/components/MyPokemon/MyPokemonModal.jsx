import 'animate.css';

import { useCallback, useState, useRef, useEffect } from 'react';
import { useI18n } from 'core/context/i18nContext';
import { useRouter } from 'next/router';
import { removeTeamMate } from './../../firebase/teams';

import { useGlobalContext } from 'core/context/GlobalContext';
import useOutsideClick from 'core/hooks/useOutsideClick';
import MyPokemon from './MyPokemon';

export default function MyPokemonModal({ pokemon, setOpenModal }) {
  const { myTeam, setMyTeam } = useGlobalContext();
  const { translator } = useI18n();
  const router = useRouter();

  const [train, doTrain] = useState(0);
  const [closing, setClosing] = useState(false);

  const releaseTeamMate = useCallback(() => {
    removeTeamMate(pokemon.id);
    closeModal(true);
  });

  const closeModal = (removed) => {
    setClosing(true);
    setTimeout(() => {
      setOpenModal(false);
      if (removed) setMyTeam(myTeam.filter((poke) => poke.id !== pokemon.id));
    }, 400);
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, closeModal);

  useEffect(() => {
    router.beforePopState(() => {
      setOpenModal(false);
      router.push('/', { locale: router.locale });
    });
  }, []);

  return (
    <div className='relative z-20' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed z-10 inset-0 overflow-y-auto'>
        <div className='flex justify-center text-center p-0'>
          <div
            ref={wrapperRef}
            className={`w-full h-screen overflow-auto sm:overflow-hidden md:h-auto md:max-w-2xl flex flex-col justify-between relative bg-white md:rounded-lg rounded-none text-left shadow-xl md:my-32 animate__animated animate__fadeInLeft animate__faster 
            ${closing ? 'animate__animated animate__fadeOutRight animate__faster' : ''}`}
          >
            <MyPokemon pokemon={pokemon} train={train} />

            <div className='flex justify-between p-6 bg-gray-50'>
              <button
                type='button'
                className='text-white inline-flex justify-center rounded-md border bg-red-600 border-gray-300 px-4 py-2 font-medium
                 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3'
                onClick={releaseTeamMate}
              >
                {translator('release')}
              </button>

              <div className='flex'>
                <button
                  type='button'
                  className='inline-flex justify-center rounded-md border bg-blue-400 border-gray-300 shadow-sm 
                  px-4 py-2 bg-blue text-base font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3'
                  onClick={() => doTrain((prev) => prev + 1)}
                >
                  {translator('train')}
                </button>

                <button
                  type='button'
                  className='inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium
                  text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3'
                  onClick={() => closeModal(false)}
                >
                  {translator('close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
