import { getTypes } from 'src/services/GetTypes';

export default async function handler(req, res) {
  const { results } = await getTypes();

  // TODO - add path to type image (switch)
  console.log(results);

  return res.status(200).json(results);
}
