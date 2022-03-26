import { search } from 'services/algolia-search';

export default async function handler(req, res) {
  const {
    query: { q, limit }
  } = req;

  const { results } = await search(q, limit);

  return res.status(200).json(results);
}
