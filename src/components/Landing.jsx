import { Container, Box, Text } from '@chakra-ui/react';
import { useGlobalContext } from 'src/context/GlobalContext';

import Pokedex from './Pokedex/Pokedex';

export default function Landing() {
  const { user } = useGlobalContext();

  return (
    <>
      <Container>
        <Box borderRadius='md' px='4' py='4' bg='blue.600' maxW='lg' align='center'>
          <Text className='w-25' as='span' fontSize='16px' color='white' align='center'>
            Welcome <b>{user ? user.name : 'Username'}</b> to PokeGen, app created with <b>NextJS</b>.
          </Text>
        </Box>
      </Container>

      <Pokedex />
    </>
  );
}
