import PageLayout from 'core/components/PageLayout';
import capitalize from 'core/utils/capitalize';

import PokemonDetail from './../../core/components/Detail/PokemonDetail';
import { TOTAL_POKEMON } from './../../core/utils/constants';

const endpoint = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

export default function PokeDetailPage({ ...data }) {
  return (
    <PageLayout title={`${data.pokemon.id} | ${data.name}`}>
      <div className='m-3 sm:m-0'>
        <PokemonDetail {...data} />
      </div>
    </PageLayout>
  );
}

export async function getStaticPaths() {
  const paramIdsEn = Array.from({ length: TOTAL_POKEMON }, (_, i) => {
    return { params: { id: String(i + 1) }, locale: 'en' };
  });

  const paramIdsEs = Array.from({ length: TOTAL_POKEMON }, (_, i) => {
    return { params: { id: String(i + 1) }, locale: 'es' };
  });

  const paramIds = paramIdsEn.concat(paramIdsEs);

  return {
    paths: paramIds,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const response = await fetch(endpoint(id));
  const pokemonObj = await response.json();
  const pokemon = { ...pokemonObj, name: capitalize(pokemonObj.name) };

  const { name } = pokemon;

  let { front_default } = pokemon.sprites.other.dream_world;
  if (!front_default) {
    ({ front_default } = pokemon.sprites.other['official-artwork']);
  }

  return { props: { pokemon, name, front_default } };
}
