import { Container, Card, Row, Text } from '@nextui-org/react';
import PokemonsTable from 'components/PokemonsTable';
import { useGlobalContext } from 'context/GlobalContext';

export default function Home({ pokemons }) {
  const { user } = useGlobalContext();

  return (
    <>
      <Container>
        <Card color='primary'>
          <Row justify='center' align='center'>
            <Text h6 size={15} color='white'>
              Pokedex Gen is an app created by <b>{user ? user.name : 'Username'}</b> with <b>NextJS</b> and <b>NextUI</b> whichs gives you the best
              developer experience with all the features you need for building beautiful and modern websites and applications.
            </Text>
          </Row>
        </Card>
      </Container>

      <PokemonsTable pokemons={pokemons} />
    </>
  );
}
