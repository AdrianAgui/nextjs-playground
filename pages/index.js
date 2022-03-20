import PageLayout from 'components/PageLayout';
import Home from 'components/Home';
import { NUM_POKEMON } from 'utils/constants';
import capitalize from 'utils/capitalize';

const endpoint = (id) => `https://pokeapi.co/api/v2/pokemon-form/${id}`;

export default function Root({ pokemons }) {
  return (
    <PageLayout>
      <Home pokemons={pokemons}></Home>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const pokemonsFetched = await Promise.all(pokemonArray().map((id) => fetch(endpoint(id))));
  const pokemonResponse = await Promise.all(pokemonsFetched.map((p) => p.json()));
  const pokemons = pokemonResponse.map((poke) => {
    return { ...poke, name: capitalize(poke.name) };
  });
  return { props: { pokemons } };
}

function pokemonArray() {
  return Array.from({ length: NUM_POKEMON }, (_, i) => i + 1);
}
