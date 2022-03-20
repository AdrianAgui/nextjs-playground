import capitalize from 'utils/capitalize';

const endpoint = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

export default async function handler(req, res) {
  try {
    const { pokeId } = req.query;
    const response = await fetch(endpoint(pokeId));
    const pokemonObj = await response.json();
    const pokemon = { ...pokemonObj, name: capitalize(pokemonObj.name) };
    res.status(200).json(pokemon);
  } catch (error) {
    console.log(error);
    res.status(400).json([]);
  }
}
