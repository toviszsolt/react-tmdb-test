const axios = require('axios');

// Set API endpoint URl
const API_ENDPOINT = '/api/';

// GraphQL body - we always need same results
const qglBody = `
totalCount pageInfo { hasNextPage endCursor }
edges { node {
    ... on Movie {
        __typename id title rating releaseDate overview poster(size: W154)
        genres { name }
        externalIds { imdb }
    }
    ... on TVShow {
        __typename id title:name rating releaseDate:firstAirDate overview poster(size:W154)
        genres{ name }
        externalIds { imdb }
    }
} }
`;

// Fetch the API
const TmdbFetch = async (query, variables) => {
  const res = await axios.post(API_ENDPOINT, { query, variables });

  if (res.status !== 200) throw new Error(res.status);

  return res.data;
};

// Validate the response data
const TmdbValidate = (data) => {
  const res = data.filter(
    (el) => el.node && el.node.id && el.node.externalIds && el.node.externalIds.imdb,
  );
  return res.sort((a, b) => Date.parse(b.node.releaseDate) - Date.parse(a.node.releaseDate));
};

// Get Trending results
export const TmdbTrending = async () => {
  const res = await TmdbFetch(
    `query {
            trending {
                ${qglBody}
            }
        }`,
  );

  return res.data ? TmdbValidate(res.data.trending.edges) : [];
};

// Get Search results
export const TmdbSearch = async (movieTitle) => {
  const res = await TmdbFetch(
    `query($movieTitle: String!) {
            search(term: $movieTitle) {
                ${qglBody}
            }
        }`,
    { movieTitle },
  );

  return res.data ? TmdbValidate(res.data.search.edges) : [];
};
