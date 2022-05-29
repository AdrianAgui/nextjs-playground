import { LIMIT } from 'core/utils/constants';
import capitalize from 'core/utils/capitalize';
import sleeper from 'core/utils/sleeper';

const locator = 'https://pokeapi.co/api/v2';

const endpointInfo = (id) => `${locator}/pokemon/${id}`;
const endpointForm = (id) => `${locator}/pokemon-form/${id}`;
const endpointSpecie = (id) => `${locator}/pokemon-species/${id}`;
const endpointPokemonType = `${locator}/type`;

export async function getApiPokemon(id) {
  const pokemonFetched = await fetch(endpointInfo(id));
  const pokemon = await pokemonFetched.json();
  return pokemon;
}

export async function getApiPokemonSpecie(id) {
  const pokemonFetched = await fetch(endpointSpecie(id));
  const pokemon = await pokemonFetched.json();
  return pokemon;
}

export async function getApiPokemons(offset = 0, limit = LIMIT) {
  const pokemonArray = Array.from({ length: limit }, (_, i) => offset + i + 1);
  const pokemonsFetched = await Promise.all(pokemonArray.map((id) => fetch(endpointForm(id))));
  const pokemons = await Promise.all(pokemonsFetched.map((p) => p.json()));
  await sleeper(500);
  return pokemons.map((poke) => {
    return { ...poke, name: capitalize(poke.name) };
  });
}

export async function getApiPokemonType(typeLabel, offset = 0, limit = 50) {
  const typesPokemonFetched = await fetch(endpointPokemonType);
  const { results } = await typesPokemonFetched.json();

  const { url } = results.find((type) => type.name === typeLabel);

  const typePokemonsFetched = await fetch(url);
  let { pokemon } = await typePokemonsFetched.json();

  pokemon = pokemon.slice(offset, offset + limit);

  const pokemonsFetched = await Promise.all(pokemon.map((poke) => fetch(poke.pokemon.url)));
  const pokemons = await Promise.all(pokemonsFetched.map((p) => p.json()));

  return pokemons.map((poke) => {
    return { ...poke, name: capitalize(poke.name) };
  });
}
