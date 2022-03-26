import PageLayout from 'components/PageLayout';
import Home from 'components/Home';
import { search } from 'services/algolia-search';
import { TOTAL_SEARCH } from 'utils/constants';

export default function Root({ pokemons }) {
  return (
    <PageLayout>
      <Home pokemons={pokemons}></Home>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const { results } = await search('', TOTAL_SEARCH, true);
  return { props: { pokemons: results } };
}
