import PageLayout from 'components/PageLayout';
import Home from 'components/Home';
import serverName from 'utils/serverName';

export default function Root({ pokemons }) {
  return (
    <PageLayout>
      <Home pokemons={pokemons}></Home>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const response = await fetch(`${serverName()}/api/pokemon/list`);
  const pokemons = await response.json();
  return { props: { pokemons } };
}
