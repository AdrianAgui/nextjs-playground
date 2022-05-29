import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import css from 'styles/MyTeam.module.scss';

import dynamic from 'next/dynamic';
const MyPokemonModal = dynamic(() => import('../../Modals/MyPokemonModal'));

function Slot({ pokemon }) {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openModal ? 'hidden' : 'auto';
  }, [openModal]);

  return (
    <>
      <div key={pokemon.id} className='relative'>
        <div className={pokemon.id && css.teamMate}>
          {pokemon && pokemon.id ? (
            <Image
              src={pokemon.imageURL}
              alt={pokemon.name}
              className='z-10 cursor-pointer'
              width={150}
              height={150}
              onClick={() => setOpenModal(true)}
            />
          ) : (
            <div style={{ width: '150px', height: '150px' }} />
          )}

          <div className='absolute top-0 left-0'>
            <div className={css.pokeball}></div>
          </div>
        </div>
      </div>

      {openModal && <MyPokemonModal pokemon={pokemon} setOpenModal={setOpenModal} />}
    </>
  );
}

export default memo(Slot);
