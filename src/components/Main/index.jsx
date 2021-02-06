import React, { useState } from 'react';
import Appbar from '../Appbar';
import Footer from '../Footer';
import Hero from '../Hero';
import Results from './Results';
import Searchbar from './Searchbar';
import SearchContext from './SearchContext';

const Main = () => {
  const [searchString, setSearchStrinig] = useState('');

  return (
    <SearchContext.Provider value={[searchString, setSearchStrinig]}>
      <Appbar />
      <Hero>
        <Searchbar />
      </Hero>
      <Results />
      <Footer />
    </SearchContext.Provider>
  );
};

export default Main;
