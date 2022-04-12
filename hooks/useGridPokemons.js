import { useState, useEffect } from 'react';
import { LIMIT, INITIAL_PAGE } from 'utils/constants';
import { getApiPokemons } from 'services/GetPokemons';

export default function useGridPokemons() {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);

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

  useEffect(() => {
    if (page === INITIAL_PAGE) return;

    setLoading(true);
    getApiPokemons(LIMIT * (page - 1), LIMIT).then((nextPokes) => {
      setPokemons((prevPokes) => prevPokes.concat(nextPokes));
      setLoading(false);
    });
  }, [page]);

  return { loading, pokemons, setPage };
}
