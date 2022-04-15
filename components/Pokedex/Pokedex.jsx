import css from 'styles/Pokedex.module.css';

import PokedexScreen from './PokedexScreen';
import PokedexForm from './PokedexForm';
import { getApiPokemon } from 'services/GetPokemons';

import { useState, useEffect } from 'react';
import { TOTAL_POKEMON } from 'utils/constants';

export default function Pokedex() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);

  const randomId = Math.floor(Math.random() * TOTAL_POKEMON);
  const [pokemonId, setPokemonId] = useState(randomId);

  useEffect(() => {
    setLoading(true);
    getApiPokemon(pokemonId)
      .then((pokeData) => {
        console.log(pokeData);
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
            <div className={css['pokedex-left-lights']}>
              <div className={`${css['light']} ${css['is-blue']} ${css['is-medium']}`} />
              <div className={`${css['light']} ${css['is-green']} ${css['is-large']}`} />
              <div className={`${css['light']} ${css['is-orange']} ${css['is-large']}`} />
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
