import { useState, useEffect } from 'react';

import PokemonItem from './PokemonItem';
import PokemonSkeleton from './PokemonSkeleton';

import css from 'styles/PokemonGrid.module.css';

export default function PokemonGrid({ pokemons }) {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setDataLoaded(pokemons && pokemons[0] && pokemons.length > 0);
  }, [pokemons]);

  return (
    <div className={css.container}>
      {!dataLoaded && pokemons.map((_, index) => <PokemonSkeleton key={index} />)}
      {dataLoaded && pokemons.length > 0 && pokemons.map((pokemon, index) => <PokemonItem pokemon={pokemon} key={index} />)}
      {!pokemons && <h1>No hay pokemons</h1>}
    </div>
  );
}
