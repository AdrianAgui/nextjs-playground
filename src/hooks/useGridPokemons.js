import { useState, useEffect } from 'react';
import { LIMIT, INITIAL_PAGE } from 'src/utils/constants';
import { getApiPokemons } from 'src/services/GetPokemons';
import { useGlobalContext } from './../context/GlobalContext';
import { getApiPokemonType } from 'src/services/GetPokemons';

export default function useGridPokemons() {
  const { pokeType } = useGlobalContext();

  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);

  useEffect(() => {
    console.log('getApiPokemons');
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
    console.log('getApiPokemons paged');

    if (page === INITIAL_PAGE || pokeType) return;

    setLoading(true);
    getApiPokemons(LIMIT * (page - 1), LIMIT).then((nextPokes) => {
      setPokemons((prevPokes) => prevPokes.concat(nextPokes));
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    if (pokeType) {
      setLoading(true);
      setPokemons(new Array(LIMIT).fill(null));
      setPage(INITIAL_PAGE);

      getApiPokemonType(pokeType)
        .then((data) => {
          setPokemons(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [pokeType]);

  return { loading, pokemons, page, setPage };
}
