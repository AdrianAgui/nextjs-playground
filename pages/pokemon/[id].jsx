import PageLayout from 'core/components/PageLayout';
import capitalize from 'core/utils/capitalize';

import PokemonDetail from './../../core/components/Detail/PokemonDetail';
import { TOTAL_POKEMON } from './../../core/utils/constants';

const locator = 'https://pokeapi.co/api/v2';

const endpointInfo = (id) => `${locator}/pokemon/${id}`;
const endpointForm = (id) => `${locator}/pokemon-form/${id}`;
const endpointSpecie = (id) => `${locator}/pokemon-species/${id}`;

export default function PokeDetailPage({ ...data }) {
  return (
    <PageLayout title={`${data.id} | ${data.name}`}>
      <div className='p-3 pb-16'>
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

  const pokemonFetched = await fetch(endpointInfo(id));
  const pokemonObj = await pokemonFetched.json();
  const pokemonInfo = { ...pokemonObj, name: capitalize(pokemonObj.name) };
  const {
    name,
    sprites: { front_default, back_default }
  } = pokemonInfo;
  let image = pokemonInfo.sprites.other.dream_world.front_default;
  if (!image) {
    image = pokemonInfo.sprites.other['official-artwork'].front_default;
  }

  const pokemonFetchedSpecie = await fetch(endpointSpecie(id));
  const pokemonSpecie = await pokemonFetchedSpecie.json();
  const { names, flavor_text_entries, genera } = pokemonSpecie;

  const pokemonFetchedForm = await fetch(endpointForm(id));
  const pokemonForm = await pokemonFetchedForm.json();
  const { types } = pokemonForm;

  return {
    props: {
      id,
      name,
      names,
      imageUrl: image,
      front: front_default,
      back: back_default,
      alias: genera,
      descriptions: flavor_text_entries,
      types
    }
  };
}
