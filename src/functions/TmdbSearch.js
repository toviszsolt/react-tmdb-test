const axios = require('axios');

// Set API endpoint URl
const API_ENDPOINT = '/api/';

// GraphQL body - we always need same results
const qglBody = `
totalCount pageInfo { hasNextPage endCursor }
edges { node {
    ... on MovieResult {
        __typename id title rating releaseDate overview poster(size: W154) details { genres { name } }
        externalIds { imdb }
    }
    ... on TVShowResult {
        __typename id title:name rating releaseDate:firstAirDate overview poster(size:W154) details { genres{ name } }
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
const TmdbValidate = (json) => json.filter((el) => el.node && el.node.id);

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
  const json = await TmdbFetch(
    `query($movieTitle: String!) {
            search(term: $movieTitle) {
                ${qglBody}
            }
        }`,
    { movieTitle },
  );

  return json.data ? TmdbValidate(json.data.search.edges) : [];
};
