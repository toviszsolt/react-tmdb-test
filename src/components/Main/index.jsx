import React from 'react';
import Appbar from '../Common/Appbar';
import Footer from '../Common/Footer';
import Hero from '../Common/Hero';
import Results from './Results';
import Searchbar from './Searchbar';
import { SearchContextProvider } from './SearchContextProvider';

const Main = () => {
  return (
    <SearchContextProvider>
      <Appbar />
      <Hero>
        <Searchbar />
      </Hero>
      <Results />
      <Footer />
    </SearchContextProvider>
  );
};

export default Main;
