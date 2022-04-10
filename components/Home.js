import PokemonGrid from 'components/Grid/PokemonGrid';
import { useState, useEffect } from 'react';
import { useGlobalContext } from 'context/GlobalContext';
import { Container, Box, Text } from '@chakra-ui/react';
import { getApiPokemons } from 'services/GetPokemons';
import { NUM_POKEMON_BY_PAGE } from './../utils/constants';

export default function Home() {
  const { user } = useGlobalContext();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    setPokemons(new Array(NUM_POKEMON_BY_PAGE).fill(null));
    getApiPokemons(0, NUM_POKEMON_BY_PAGE).then(setPokemons);
  }, []);

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
    </>
  );
}
