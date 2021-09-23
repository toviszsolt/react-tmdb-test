const axios = require('axios');

// Set API endpoint URl
const API_ENDPOINT = 'https://en.wikipedia.org/w/api.php';

// Fetch the API
const WikipediaSearch = async (searchString) => {
  const res = await axios.get(API_ENDPOINT, {
    params: {
      action: 'query',
      format: 'json',
      prop: 'extracts|info|extlinks',
      continue: 'gsroffset||',
      generator: 'search',
      redirects: '1',
      converttitles: '1',
      formatversion: '2',
      exchars: '300',
      exlimit: '1',
      exintro: '1',
      explaintext: '1',
      inprop: 'url',
      gsrnamespace: '0',
      ellimit: '1',
      elprotocol: 'https',
      elquery: 'www.imdb.com/title',
      origin: '*',
      gsrlimit: '1',
      gsrsearch: searchString,
    },
  });

  if (res.status !== 200) throw new Error(res.status);

  return res.data.query.pages[0] || [];
};

export default WikipediaSearch;
