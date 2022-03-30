import PageLayout from 'components/PageLayout';
import Home from 'components/Home';
import { getPokemons } from 'services/GetPokemons';

export default function Root({ pokemons }) {
  return (
    <PageLayout>
      <Home pokemons={pokemons} />
    </PageLayout>
  );
}

export async function getStaticProps() {
  const pokemons = await getPokemons();
  return { props: { pokemons } };
}
