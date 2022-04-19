import { Container, Box, Text } from '@chakra-ui/react';
import { useGlobalContext } from 'src/context/GlobalContext';

import css from 'styles/Landing.module.scss';

import PokedexLink from './PokedexLink';
import PokeGridLink from './PokeGridLink';
import MyTeam from './MyTeam/MyTeam';

export default function Landing() {
  const { user } = useGlobalContext();

  return (
    <>
      <Container maxW='container.sm'>
        <Box borderRadius='md' px='4' py='4' bg='blue.600' maxW='lg' align='center'>
          <Text className='w-25' as='span' fontSize='16px' color='white' align='center'>
            Welcome <b>{user ? user.name : 'Username'}</b> to PokeGen, app created with <b>NextJS</b>.
          </Text>
        </Box>
      </Container>

      <section className={css.wrapper}>
        <article className={css.myteam}>
          <MyTeam />
        </article>

        <article className={css.pokedex}>
          <PokedexLink />
        </article>

        <article className={css.pokegrid}>
          <PokeGridLink />
        </article>
      </section>
    </>
  );
}
