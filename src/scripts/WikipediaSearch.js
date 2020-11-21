const API_ENDPOINT = 'https://en.wikipedia.org/w/api.php';

// Basic fetch for Wikipedia API endpoint
const WikipediaFetch = async searchString => {
    const options = {
        method: 'get',
        redirect: 'follow'
    };

    const query = '?action=query&format=json&prop=extracts%7Cinfo%7Cextlinks&continue=gsroffset%7C%7C&generator=search&' +
        'redirects=1&converttitles=1&formatversion=2&exchars=300&exlimit=1&exintro=1&explaintext=1&inprop=url' +
        '&gsrnamespace=0&ellimit=1&elprotocol=https&elquery=www.imdb.com/title&origin=*&gsrlimit=1&gsrsearch=' + searchString;

    const res = await fetch( API_ENDPOINT + query, options );

    if ( !res.ok ) {
        throw new Error( res.status );
    }

    return await res.json();
}

// Search Movie by Title
const WikipediaSearch = async movieTitle => {
    const json = await WikipediaFetch( movieTitle );
    return await json.query.pages[0] || [];
}

export default WikipediaSearch;
