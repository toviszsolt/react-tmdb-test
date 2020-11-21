//const API_ENDPOINT = 'http://tmdb.sandbox.zoosh.ie/';
const API_ENDPOINT = '/api/';

// Basic fetch for Zoosh API endpoint
const ZooshFetch = async query => {
    const options = {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify( { query: query } )
    };

    const res = await fetch( API_ENDPOINT, options );

    if ( !res.ok ) {
        throw new Error( res.status );
    }

    return await res.json();
}

// GrapghQL Body
const qglBody = `
totalCount pageInfo { hasNextPage endCursor }
edges { node {
    ... on Movie {
        __typename id title rating releaseDate overview poster(size: W154) details { genres { name } }
        externalIds { imdb }
    }
    ... on TVShow {
        __typename id title:name rating releaseDate:firstAirDate overview poster(size:W154) details { genres{ name } }
        externalIds { imdb }
    }
} }
`;

// Validate json data
const ZooshValidate = json => json.filter( el => el.node && el.node.id );

// Fetch Trending Movies
const ZooshTrending = async () => {
    const json = await ZooshFetch(
        `{ trending {
            ${qglBody}
        } }`
    );

    return await json.data ? ZooshValidate( json.data.trending.edges ) : [];
}

// Search Movie by Title
const ZooshSearch = async movieTitle => {
    const json = await ZooshFetch(
        `{ search(term: "${movieTitle}") {
            ${qglBody}
        } }`
    );

    return await json.data ? ZooshValidate( json.data.search.edges ) : [];
}

export { ZooshSearch, ZooshTrending }
