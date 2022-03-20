import capitalize from 'utils/capitalize';

const NUM_POKEMON = 151;
const endpoint = (id) => `https://pokeapi.co/api/v2/pokemon-form/${id}`;

export default async function handler(req, res) {
  try {
    const pokemonsFetched = await Promise.all(pokemonArray().map((id) => fetch(endpoint(id))));
    const pokemonResponse = await Promise.all(pokemonsFetched.map((p) => p.json()));
    const pokemonData = pokemonResponse.map((poke) => {
      return { ...poke, name: capitalize(poke.name) };
    });
    res.status(200).json(pokemonData);
  } catch (error) {
    console.log(error);
    res.status(400).json([]);
  }
}

function pokemonArray() {
  return Array.from({ length: NUM_POKEMON }, (_, i) => i + 1);
}
