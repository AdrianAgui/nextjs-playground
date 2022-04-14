import { Spinner } from '@chakra-ui/react';
import { useEffect, useRef, useCallback } from 'react';

import PageLayout from 'components/PageLayout';
import PokemonGrid from 'components/Grid/PokemonGrid';
import useGridPokemons from 'hooks/useGridPokemons';
import useNearScreen from 'hooks/useNearScreen';

import debounce from 'just-debounce-it';

export default function Home() {
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
    <PageLayout>
      <PokemonGrid pokemons={pokemons} />

      {loading && (
        <div className='w-max py-5 my-0 mx-auto'>
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' size='xl' />
        </div>
      )}

      <div id='visor' ref={externalRef}></div>
    </PageLayout>
  );
}
