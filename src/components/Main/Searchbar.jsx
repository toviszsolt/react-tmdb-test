import React, { useContext } from 'react';
import Button from '../Common/Button';
import Container from '../Common/Container';
import String from '../../modules/Strings';
import styles from './Searchbar.module.css';
import { SearchContext } from './SearchContextProvider';

// Searchbar component
const Searchbar = () => {
  const [, setSearchString] = useContext(SearchContext);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchString(e.target.search.value);
  };

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <Container>
        <h1 className={styles.title}>
          {String.Main.Searchbar.quoteTilte}
          &mdash;
          <i>{String.Main.Searchbar.quoteAuthor}</i>
        </h1>
        <label htmlFor="search" className={styles.search}>
          <input
            id="search"
            type="text"
            name="search"
            placeholder={String.Main.Searchbar.titleSearchInput}
          />
          <Button type="submit" text={String.Main.Searchbar.titleSearchButton} />
        </label>
      </Container>
    </form>
  );
};

export default Searchbar;
