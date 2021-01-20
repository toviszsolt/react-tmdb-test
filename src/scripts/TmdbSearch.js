const axios = require( 'axios' );

const API_ENDPOINT = '/api/'

const TmdbFetch = async ( query, variables ) => {
    const res = await axios.post( API_ENDPOINT, { query: query, variables: variables } )

    if ( res.status !== 200 ) {
        throw new Error( res.status )
    }

    return await res.data
}

export const TmdbTrending = async () => {
    const res = await TmdbFetch(
        `query {
            trending {
                ${qglBody}
            }
        }`
    )

    return await res.data ? TmdbValidate( res.data.trending.edges ) : []
}

export const TmdbSearch = async movieTitle => {
    const json = await TmdbFetch(
        `query($movieTitle: String!) {
            search(term: $movieTitle) {
                ${qglBody}
            }
        }`, { movieTitle: movieTitle }
    )

    return await json.data ? TmdbValidate( json.data.search.edges ) : []
}

const TmdbValidate = json => json.filter( el => el.node && el.node.id )

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
`
