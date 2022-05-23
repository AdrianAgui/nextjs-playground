import algoliasearch from 'algoliasearch/lite';

const APP_ID = process.env.ALGOLIA_APP_ID;
const API_KEY = process.env.ALGOLIA_API_KEY;

const client = algoliasearch(APP_ID, API_KEY);
const index = client.initIndex('pokedex-gen');

const CACHE = {};

export const search = async (query, limit, unlimited) => {
  if (!unlimited && !query) return { results: {} };

  if (CACHE[query]) {
    return { results: CACHE[query] };
  }

  await index.setSettings({
    ranking: ['asc(id)', 'typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom']
  });

  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'name', 'sprites'],
    hitsPerPage: limit
  });

  CACHE[query] = hits;

  return { results: hits };
};
