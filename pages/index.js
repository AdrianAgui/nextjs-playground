import PageLayout from 'components/PageLayout';
import Home from 'components/Home';
import { search } from 'services/algolia-search';

export default function Root({ pokemons }) {
  return (
    <PageLayout>
      <Home pokemons={pokemons}></Home>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = '' } = query;

  const { results } = await search(q);

  return { props: { query: query, pokemons: results } };
}
