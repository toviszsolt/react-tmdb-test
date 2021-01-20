import { useState, useEffect } from 'react'
import { Container, AppBar, Hero, Results, Footer } from './Layout'
import { TmdbSearch, TmdbTrending } from '../scripts/TmdbSearch'
import Strings from './Strings'
import SearchBar from './SearchBar'
import Movie from './Movie'
import styles from './styles/Main.module.css'

// ----- Title ------------------------------------------------------------------------------------------------------ //

const Title = ( { title } ) => {
    const info = [
        Strings.Main.InfoLoading,
        Strings.Main.InfoError,
        Strings.Main.InfoNoResults
    ]
    const className = info.includes( title ) ? styles.loading : null

    return (
        <h2 className={ className }>{ title }</h2>
    )
}

// ----- Main ------------------------------------------------------------------------------------------------------- //

const Main = () => {

    const [title, setTitle] = useState( null )
    const [results, setResults] = useState( null )

    const startLoading = () => {
        setTitle( Strings.Main.InfoLoading )
        setResults( null )
    }

    useEffect( () => {
        startLoading()
        TmdbTrending()
            .then( res => {
                setTitle( res.length ? Strings.Main.TitleTrending : Strings.Main.InfoNoResults )
                setResults( res )
            } )
            .catch( res => {
                setTitle( Strings.Main.InfoError )
            } )
    }, [] )


    const onSubmitHandler = ( e ) => {
        e.preventDefault()
        startLoading()

        const searchString = e.target.elements.search.value

        if ( !searchString ) {
            // Show Trending list if no search string
            TmdbTrending()
                .then( res => {
                    setTitle( res.length ? Strings.Main.TitleTrending : Strings.Main.InfoNoResults )
                    setResults( res )
                } )
                .catch( res => {
                    setTitle( Strings.Main.InfoError )
                } )
        } else {
            // Show Results
            TmdbSearch( searchString )
                .then( res => {
                    setTitle( res.length ? Strings.Main.TitleSearchResults + searchString : Strings.Main.InfoNoResults )
                    setResults( res )
                } )
                .catch( res => {
                    setTitle( Strings.Main.InfoError )
                } )
        }
    }

    return (
        <>
            <AppBar />
            <Hero>
                <form autoComplete="off" onSubmit={ onSubmitHandler }>
                    <Container>
                        <SearchBar />
                    </Container>
                </form>
            </Hero>
            <Results>
                <Title title={ title } />
                { results && results.map( ( item, index ) => (
                    <Movie key={ index } data={ item.node } />
                ) ) }
            </Results>
            <Footer />
        </>
    )
}

export default Main
