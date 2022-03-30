import PokemonsTable from 'components/PokemonsTable';
import { useGlobalContext } from 'context/GlobalContext';
import { Container, Box, Text } from '@chakra-ui/react';

export default function Home({ pokemons }) {
  const { user } = useGlobalContext();

  return (
    <>
      <Container>
        <Box borderRadius='md' px='4' py='4' bg='blue.600' maxW='lg' align='center'>
          <Text className='w-25' as='span' fontSize='16px' color='white' align='center'>
            Pokedex Gen is an app created by <b>{user ? user.name : 'Username'}</b> with <b>NextJS</b>.
          </Text>
        </Box>
      </Container>

      <PokemonsTable pokemons={pokemons} />
    </>
  );
}
