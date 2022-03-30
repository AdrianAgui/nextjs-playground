import { NUM_POKEMON } from 'utils/constants';
import capitalize from 'utils/capitalize';

const endpoint = (id) => `https://pokeapi.co/api/v2/pokemon-form/${id}`;

export async function getPokemons() {
  const pokemonArray = Array.from({ length: NUM_POKEMON }, (_, i) => i + 1);
  const pokemonsFetched = await Promise.all(pokemonArray.map((id) => fetch(endpoint(id))));
  const pokemons = await Promise.all(pokemonsFetched.map((p) => p.json()));
  return pokemons.map((poke) => {
    return { ...poke, name: capitalize(poke.name) };
  });
}
