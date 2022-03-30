import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('1RKVX9BEPV', 'cf4e982fae5d7c6c5971acb245c2def1');
const index = client.initIndex('pokedex-gen-1');

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
