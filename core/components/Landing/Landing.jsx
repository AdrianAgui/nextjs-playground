import { Container, Box, Text } from '@chakra-ui/react';
import { useGlobalContext } from 'core/context/GlobalContext';
import { useI18n } from 'core/context/i18nContext';

import parse from 'html-react-parser';

import css from 'styles/Landing.module.scss';

import PokedexLink from './PokedexLink';
import PokeGridLink from './PokeGridLink';
import MyTeam from './MyTeam/MyTeam';

export default function Landing() {
  const { user } = useGlobalContext();
  const { translator } = useI18n();

  return (
    <>
      {user && (
        <Container maxW='md'>
          <Box borderRadius='md' px='4' py='4' bg='blue.600' maxW='lg' align='center'>
            <Text className='w-25' as='span' fontSize='16px' color='white' align='center'>
              {parse(translator('welcome.logged', user ? user.name : 'Username', 'NextJS'))}
            </Text>
          </Box>
        </Container>
      )}

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
