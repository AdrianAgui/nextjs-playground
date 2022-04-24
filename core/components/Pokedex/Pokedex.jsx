import css from 'styles/Pokedex.module.scss';

import PokedexScreen from './PokedexScreen';
import PokedexForm from './PokedexForm';
import { getApiPokemon } from 'core/services/GetPokemons';
import { addTeamMate } from 'core/firebase/teams';
import { useGlobalContext } from 'core/context/GlobalContext';

import { useState, useEffect, useCallback } from 'react';
import { TOTAL_POKEMON } from 'core/utils/constants';
import randomPokemon from 'core/utils/randomPokemon';
import Link from 'next/link';

export default function Pokedex() {
  const { user } = useGlobalContext();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);

  const randomId = randomPokemon();
  const [pokemonId, setPokemonId] = useState(randomId);

  const handleRandomPokemon = useCallback(() => {
    setPokemonId(Math.floor(Math.random() * TOTAL_POKEMON));
  });

  const handleCatch = useCallback(() => {
    addTeamMate(user.uid, pokemon);
  });

  useEffect(() => {
    setLoading(true);
    getApiPokemon(pokemonId)
      .then((pokeData) => {
        setPokemon(pokeData);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      });
  }, [pokemonId]);

  return (
    <div className={css['pokedex-container']}>
      <div className={css['pokedex']}>
        <div className={css['pokedex-left']}>
          <div className={css['pokedex-left-top']}>
            <div className={`${css['light']} ${css['is-sky']} ${css['is-big']}`} />
            <div className={`${css['light']} ${css['is-red']}`} />
            <div className={`${css['light']} ${css['is-yellow']}`} />
            <div className={`${css['light']} ${css['is-green']}`} />
          </div>
          <div className={css['pokedex-screen-container']}>
            <PokedexScreen pokemon={pokemon} loading={loading} error={error} />
          </div>
          <div className={css['pokedex-left-bottom']}>
            <div className='flex items-center'>
              <input type='button' className={`${css['pokemon-btn']} text-3xl font-bold`} value='?' onClick={handleRandomPokemon} />
              <div className='flex flex-col ml-3 text-lg font-bold'>
                <div
                  className={`flex justify-center items-center mb-1 cursor-pointer ${css['light']} ${css['is-green']} ${css['is-large']}`}
                  onClick={handleCatch}
                >
                  Catch!
                </div>
                <div className={`flex justify-center items-center cursor-pointer ${css['light']} ${css['is-orange']} ${css['is-large']}`}>
                  <Link href={`/pokemon/${pokemonId}`}>
                    <a className='flex items-center'>Detail</a>
                  </Link>
                </div>
              </div>
            </div>
            <PokedexForm pokemonId={pokemonId} setPokemonId={setPokemonId} setLoading={setLoading} />
          </div>
        </div>
        <div className={css['pokedex-right-front']} />
        <div className={css['pokedex-right-back']} />
      </div>
    </div>
  );
}
