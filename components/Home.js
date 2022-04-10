import { useState, useEffect } from 'react';
import { Container, Box, Text } from '@chakra-ui/react';

import PokemonGrid from 'components/Grid/PokemonGrid';
import Pagination from './Grid/Pagination';

import { useGlobalContext } from 'context/GlobalContext';
import { getApiPokemons } from 'services/GetPokemons';
import { LIMIT, INITIAL_PAGE } from './../utils/constants';

export default function Home() {
  const { user } = useGlobalContext();
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);

  useEffect(() => {
    setPokemons(new Array(LIMIT).fill(null));
    getApiPokemons(0, LIMIT).then(setPokemons);
  }, []);

  useEffect(() => {
    getApiPokemons((page - 1) * LIMIT, LIMIT).then(setPokemons);
  }, [page]);

  return (
    <>
      <Container>
        <Box borderRadius='md' px='4' py='4' bg='blue.600' maxW='lg' align='center'>
          <Text className='w-25' as='span' fontSize='16px' color='white' align='center'>
            Pokedex Gen is an app created by <b>{user ? user.name : 'Username'}</b> with <b>NextJS</b>.
          </Text>
        </Box>
      </Container>

      <PokemonGrid pokemons={pokemons} />

      <Pagination page={page} setPage={setPage} />
    </>
  );
}
