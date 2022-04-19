import css from 'styles/Pokedex.module.scss';

import PokedexScreen from './PokedexScreen';
import PokedexForm from './PokedexForm';
import { getApiPokemon } from 'src/services/GetPokemons';

import { useState, useEffect } from 'react';
import { TOTAL_POKEMON } from 'src/utils/constants';
import randomPokemon from './../../utils/randomPokemon';

export default function Pokedex() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);

  const randomId = randomPokemon();
  const [pokemonId, setPokemonId] = useState(randomId);

  const handleRandomPokemon = () => {
    setPokemonId(Math.floor(Math.random() * TOTAL_POKEMON));
  };

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
            <div className={`flex ${css['pokedex-left-lights']}`}>
              <input type='button' className={`${css['pokemon-btn']} text-3xl font-bold`} value='?' onClick={handleRandomPokemon} />
              <div className='flex flex-col ml-3'>
                <div className={`mb-1 ${css['light']} ${css['is-green']} ${css['is-large']}`} />
                <div className={`${css['light']} ${css['is-orange']} ${css['is-large']}`} />
              </div>
            </div>
            <PokedexForm pokemonId={pokemonId} setPokemonId={setPokemonId} setLoading={setLoading} />
          </div>
        </div>
        {/* <div className={css['pokedex-right-front']} />
        <div className={css['pokedex-right-back']} /> */}
      </div>
    </div>
  );
}
