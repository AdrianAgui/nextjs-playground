import { Spinner } from '@chakra-ui/react';
import { useEffect, useRef, useCallback } from 'react';

import PageLayout from 'src/components/PageLayout';
import PokemonGrid from 'src/components/Grid/PokemonGrid';
import useGridPokemons from 'src/hooks/useGridPokemons';
import useNearScreen from 'src/hooks/useNearScreen';

import debounce from 'just-debounce-it';

export default function PokeGridPage() {
  const { loading, pokemons, page, setPage } = useGridPokemons();

  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({ ref: externalRef, once: false });

  const debounceHandleNextPage = useCallback(
    debounce(() => setPage((prevPage) => prevPage + 1), 300),
    [setPage]
  );

  useEffect(() => {
    if (page && isNearScreen) debounceHandleNextPage();
  }, [isNearScreen]);

  return (
    <PageLayout title={`PokeGrid`}>
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
