import { Container, Box, Text, Spinner } from '@chakra-ui/react';
import { useEffect, useRef, useCallback } from 'react';

import PokemonGrid from 'components/Grid/PokemonGrid';
import useGridPokemons from 'hooks/useGridPokemons';

import { useGlobalContext } from 'context/GlobalContext';
import useNearScreen from './../hooks/useNearScreen';
import debounce from 'just-debounce-it';

export default function Home() {
  const { user } = useGlobalContext();

  const { loading, pokemons, setPage } = useGridPokemons();

  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({ distance: '300px', ref: externalRef, once: false });

  const debounceHandleNextPage = useCallback(
    debounce(() => setPage((prevPage) => prevPage + 1), 300),
    [setPage]
  );

  useEffect(() => {
    if (isNearScreen) debounceHandleNextPage();
  }, [debounceHandleNextPage, isNearScreen]);

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

      {loading && (
        <div className='w-max py-5 my-0 mx-auto'>
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' size='xl' />
        </div>
      )}

      <div id='visor' ref={externalRef}></div>
    </>
  );
}
