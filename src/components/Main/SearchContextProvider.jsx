import React, { createContext, useState } from 'react';

const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [searchString, setSearchStrinig] = useState('');

  return (
    <SearchContext.Provider value={[searchString, setSearchStrinig]}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
