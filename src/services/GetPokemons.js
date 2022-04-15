import { TOTAL_POKEMON } from 'src/utils/constants';
import capitalize from 'src/utils/capitalize';
import sleeper from 'src/utils/sleeper';

const endpoint1 = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const endpoint2 = (id) => `https://pokeapi.co/api/v2/pokemon-form/${id}`;

export async function getApiPokemon(id) {
  const pokemonFetched = await fetch(endpoint1(id));
  const pokemon = await pokemonFetched.json();
  return pokemon;
}

export async function getApiPokemons(offset = 0, limit = TOTAL_POKEMON) {
  const pokemonArray = Array.from({ length: limit }, (_, i) => offset + i + 1);
  const pokemonsFetched = await Promise.all(pokemonArray.map((id) => fetch(endpoint2(id))));
  const pokemons = await Promise.all(pokemonsFetched.map((p) => p.json()));
  await sleeper(1000);
  return pokemons.map((poke) => {
    return { ...poke, name: capitalize(poke.name) };
  });
}
