import React from 'react';
import Strings from '../config/Strings.json';
import WikipediaSearch from '../scripts/WikipediaSearch';
import PosterPlaceholder from '../images/moviePlaceholder.png';
import './MovieItem.css';

class MovieItem extends React.Component {

    // Constructor
    constructor( props ) {
        super( props );

        this.state = {
            loading: false,
            isExtraVisible: false,
            data: props.data || [],
            resultsWikipedia: []
        };

        this.dateFormat = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
    }

    // Exception Handler for API request
    exceptionHandler( error ) {
        this.setState( { error: true, loading: false, results: [] } );
        console.log( error );
    }

    // Toggle Extra Box
    toggleExtra = () => {
        this.setState( { loading: true } );
        this.setState( prevState => ( { isExtraVisible: !prevState.isExtraVisible } ) );

        const { data, resultsWikipedia } = this.state;

        const year = new Date( data.releaseDate ).getFullYear();
        const search = data.__typename === 'TVShowResult'
            ? `${data.title} ${year} tv series`
            : `${data.title} ${year} film`;

        if ( !resultsWikipedia.length ) {
            WikipediaSearch( search )
                .then( res => this.setState( { loading: false, resultsWikipedia: res } ) )
                .catch( res => this.exceptionHandler( res ) );
        }
    }

    // Render Component
    render() {
        const { data, resultsWikipedia, isExtraVisible, loading } = this.state;

        // Make IMDb Url
        const imdbUrl = ( data.externalIds && data.externalIds.imdb )
            ? 'https://imdb.com/title/' + data.externalIds.imdb
            : null;

        let imdbLink;
        let wikipediaLink;

        // IMDb link
        if ( imdbUrl ) {
            imdbLink = <a href={ imdbUrl } target="_blank" rel="noreferrer" className="text-trim">{ imdbUrl }</a>;
        }

        // Wikipedia link
        if ( resultsWikipedia.length && resultsWikipedia.canonicalurl ) {
            wikipediaLink =
                <a href={ resultsWikipedia.canonicalurl } target="_blank" rel="noreferrer" className="text-trim">
                    { resultsWikipedia.canonicalurl }
                </a>;
        }

        // Loading
        if ( !resultsWikipedia.length && loading ) {
            wikipediaLink = Strings.Main.InfoLoading;
        }

        return (
            <article>
                <img src={ data.poster || PosterPlaceholder } alt={ data.title + ' poster image' } />
                <div className="details">
                    <h3 className="title text-trim" onClick={ this.toggleExtra }>{ data.title } &mdash; { data.__typename.replace( 'Result', '' ) }</h3>
                    <div className="category text-trim">{ ( data.details.genres || [] ).map( el => el.name ).join( ', ' ) }</div>
                    <div className="released">{ new Date( data.releaseDate ).toLocaleDateString( 'en-EN', this.dateFormat ) }</div>
                    <div className="description">{ data.overview }</div>
                    <div className="rating">{ data.rating }</div>
                    <div className={ `extra ${isExtraVisible ? 'active' : ''}` }>
                        <div className="title text-trim" onClick={ this.toggleExtra }>{ data.title } &mdash; External Resourses</div>
                        <div className="category">
                            { imdbLink }
                            { wikipediaLink }
                        </div>
                        <div className="description">{ resultsWikipedia.extract }</div>
                    </div>
                </div>
            </article>
        );
    };

}

export default MovieItem;
