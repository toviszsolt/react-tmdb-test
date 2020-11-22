import React from 'react';
import Strings from './config/Strings.json';
import Search from './components/Search.js';
import MovieItem from './components/MovieItem.js';
import { TmdbSearch, TmdbTrending } from './scripts/TmdbSearch';
import './Main.css';

class Main extends React.Component {

  // Constructor
  constructor( props ) {
    super( props );

    this.state = {
      loading: false,
      error: false,
      title: '',
      results: []
    };
  }

  // Initial State
  componentDidMount() {
    this.loadingState();

    TmdbTrending()
      .then( res => this.setState( { loading: false, title: Strings.Main.TitleTrending, results: res } ) )
      .catch( res => this.exceptionHandler( res ) );
  }

  // Loading State for API request
  loadingState() {
    this.setState( { loading: true, results: [] } );
  }

  // Exception Handler for API request
  exceptionHandler( error ) {
    this.setState( { error: true, loading: false, results: [] } );
    console.log( error );
  }

  // Event Handler for Form Submit
  onSubmitHandler = async e => {
    e.preventDefault();

    // Get searching string
    const searchString = e.target.elements.search.value;

    // We are start loading
    this.loadingState();

    if ( !searchString ) {
      // Show Trending list if no search string
      TmdbTrending()
        .then( res => this.setState( { loading: false, title: Strings.Main.TitleTrending, results: res } ) )
        .catch( res => this.exceptionHandler( res ) );
    } else {
      // Show Results
      TmdbSearch( searchString )
        .then( res => this.setState( { loading: false, title: Strings.Main.TitleSearchResults + searchString, results: res } ) )
        .catch( res => this.exceptionHandler( res ) );
    }
  }

  // Render Content
  render() {
    const { title, results, loading, error } = this.state;
    let mainTitle;

    // Results
    if ( !results.length ) {
      mainTitle = <h2 className="info">{ Strings.Main.InfoNoResults }</h2>;
    } else {
      mainTitle = <h2>{ title }</h2>;
    }

    // Loading
    if ( loading ) {
      mainTitle = <h2 className="info">{ Strings.Main.InfoLoading }</h2>;
    }

    // Error
    if ( error ) {
      mainTitle = <h2 className="info">{ Strings.Main.InfoError }</h2>;
    }

    // Render return
    return (
      <main>
        <Search onSubmit={ this.onSubmitHandler }>{ Strings.Main.TitleHeroQuote } &mdash; <i>{ Strings.Main.TitleHeroAuthor }</i></Search>
        <section className="container results">
          { mainTitle }
          { results.map( ( item, index ) => (
            <MovieItem key={ index } data={ item.node } />
          ) ) }
        </section>
      </main>
    )
  };

}

export default Main;
