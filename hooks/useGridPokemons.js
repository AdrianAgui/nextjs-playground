import { useState, useEffect } from 'react';
import { LIMIT, INITIAL_PAGE } from 'utils/constants';
import { getApiPokemons } from 'services/GetPokemons';

export default function useGridPokemons() {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    setLoading(true);
    setPokemons(new Array(LIMIT).fill(null));

    getApiPokemons(0, LIMIT)
      .then((data) => {
        setPokemons(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return { loading, pokemons };
}
