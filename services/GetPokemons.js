import { NUM_POKEMON } from 'utils/constants';
import capitalize from 'utils/capitalize';
import sleeper from 'utils/sleeper';

const endpoint = (id) => `https://pokeapi.co/api/v2/pokemon-form/${id}`;

export async function getApiPokemons(offset = 0, limit = NUM_POKEMON) {
  const pokemonArray = Array.from({ length: limit }, (_, i) => offset + i + 1);
  const pokemonsFetched = await Promise.all(pokemonArray.map((id) => fetch(endpoint(id))));
  const pokemons = await Promise.all(pokemonsFetched.map((p) => p.json()));
  await sleeper(1000);
  return pokemons.map((poke) => {
    return { ...poke, name: capitalize(poke.name) };
  });
}
