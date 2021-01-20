import { useState } from 'react'
import styles from './styles/Movie.module.css'
import Strings from './Strings'
import { Card } from './Core'
import WikipediaSearch from '../scripts/WikipediaSearch'
import PosterPlaceholder from '../images/moviePlaceholder.png'

/* ----- Date Formatter --------------------------------------------------------------------------------------------- */

const dateFormat = ( dateString ) => new Date( dateString )
    .toLocaleDateString( 'en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    } )

/* ----- Poster ----------------------------------------------------------------------------------------------------- */

const Poster = ( { data } ) => {
    return (
        <img
            src={ data.poster || PosterPlaceholder }
            alt={ data.title + ' poster image' }
            className={ styles.poster }
        />
    )
}

/* ----- Details: Basic --------------------------------------------------------------------------------------------- */

const Details = ( { data, onClick } ) => {
    return (
        <div>
            <h3 className={ `${styles.title} ${styles.textTrim}` } onClick={ onClick }>
                { data.title } &mdash; { data.__typename.replace( 'Result', '' ) }
            </h3>
            <div className={ styles.textTrim }>
                { ( data.details.genres || [] ).map( el => el.name ).join( ', ' ) }
            </div>
            <div className={ styles.released }>
                { dateFormat( data.releaseDate ) }
            </div>
            <div className={ styles.description }>
                { data.overview }
            </div>
            <div className={ styles.rating }>
                { data.rating }
            </div>
        </div>
    )
}

/* ----- Details: Extra --------------------------------------------------------------------------------------------- */

const Extra = ( { data, extra, onClick, className } ) => {
    const imdbUrl = data && data.externalIds && 'https://imdb.com/title/' + data.externalIds.imdb
    const wikipediaUrl = extra && extra.canonicalurl
    const extract = extra && extra.extract

    const imdbLink = ( imdbUrl )
        ? <a href={ imdbUrl } target="_blank" rel="noreferrer" className={ styles.textTrim }>{ imdbUrl }</a>
        : ''

    const wikipediaLink = ( wikipediaUrl )
        ? <a href={ wikipediaUrl } target="_blank" rel="noreferrer" className={ styles.textTrim }>{ wikipediaUrl }</a>
        : ''

    if ( extra ) {
        return (
            <div className={ className }>
                <div className={ `${styles.title} ${styles.textTrim}` } onClick={ onClick }>
                    { data.title } &mdash; { Strings.Main.TitleMovieExternal }
                </div>
                <div>
                    { imdbLink }
                    { wikipediaLink }
                </div>
                { <div className={ styles.description }>{ extract }</div> }
            </div>
        )
    } else {
        return (
            <div className={ className }>
                <div>{ Strings.Main.InfoLoading }</div>
            </div>
        )

    }
}

/* ----- Movie ------------------------------------------------------------------------------------------------------ */

const Movie = ( { data } ) => {
    const [toggle, setToggle] = useState( false )
    const [extra, setExtra] = useState( null )

    const year = new Date( data.releaseDate ).getFullYear()
    const searchString = data.__typename === 'TVShowResult'
        ? `${data.title} ${year} tv series`
        : `${data.title} ${year} film`

    const onClickHandler = () => {
        setToggle( !toggle )

        if ( !extra ) {
            WikipediaSearch( searchString )
                .then( res => setExtra( res ) )
                .catch( res => this.exceptionHandler( res ) )
        }
    }

    return (
        <Card>
            <Poster data={ data } />
            <div className={ styles.details }>
                <Details
                    data={ data }
                    onClick={ onClickHandler }
                />
                <Extra
                    data={ data }
                    extra={ extra }
                    onClick={ onClickHandler }
                    className={ `${styles.extra} ${toggle ? styles.active : ''}` }
                />
            </div>
        </Card>
    )
}

export default Movie
