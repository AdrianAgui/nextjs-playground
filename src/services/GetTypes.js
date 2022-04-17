const endpoint = `https://pokeapi.co/api/v2/type`;

export async function getTypes() {
  const typesFetched = await fetch(endpoint);
  const types = await typesFetched.json();
  return types;
}
