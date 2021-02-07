import React, { useContext, useRef } from 'react';
import Button from '../Button';
import Container from '../Container';
import String from '../Strings';
import styles from './Searchbar.module.css';
import SearchContext from './SearchContext';

// Searchbar component
const Searchbar = () => {
  const [, setSearchString] = useContext(SearchContext);
  const inputValue = useRef('');

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchString(inputValue.current);
  };

  const onChange = (e) => {
    inputValue.current = e.target.value;
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
            onChange={onChange}
          />
          <Button type="submit" text={String.Main.Searchbar.titleSearchButton} />
        </label>
      </Container>
    </form>
  );
};

export default Searchbar;
