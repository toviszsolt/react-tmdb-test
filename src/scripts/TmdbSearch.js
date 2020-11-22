/**
 * Proxied API endpoint
 * Development -> implemented in /src/setupProxy.js
 * Production -> need implement proxy or server side script
 */
const API_ENDPOINT = '/api/';

// Basic fetch for TMDb API endpoint
const TmdbFetch = async query => {
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
const TmdbValidate = json => json.filter( el => el.node && el.node.id );

// Fetch Trending Movies
const TmdbTrending = async () => {
    const json = await TmdbFetch(
        `{ trending {
            ${qglBody}
        } }`
    );

    return await json.data ? TmdbValidate( json.data.trending.edges ) : [];
}

// Search Movie by Title
const TmdbSearch = async movieTitle => {
    const json = await TmdbFetch(
        `{ search(term: "${movieTitle.replace( /"/g, '&quot;' )}") {
            ${qglBody}
        } }`
    );

    return await json.data ? TmdbValidate( json.data.search.edges ) : [];
}

export { TmdbSearch, TmdbTrending }
