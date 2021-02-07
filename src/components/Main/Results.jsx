import React, { useContext, useEffect, useState } from 'react';
import Container from '../Container';
import SearchContext from './SearchContext';
import styles from './Results.module.css';
import { TmdbSearch, TmdbTrending } from '../../functions/TmdbSearch';
import Movie from './Movie';
import String from '../Strings';

// Title component
const Title = ({ loading, error, results }) => {
  const [searchString] = useContext(SearchContext);

  const className = loading || error || !results ? styles.center : null;

  let title = searchString
    ? `${String.Main.Results.titleSearchResults} ${searchString}`
    : String.Main.Results.titleTrending;

  if (!results) title = String.Main.InfoNoResults;
  if (error) title = String.Main.InfoError;
  if (loading) title = String.Main.InfoLoading;

  return <h2 className={className}>{title}</h2>;
};

// List component
const List = React.memo(({ data = [] }) => {
  return data && data.map((item, index) => <Movie key={index.toString()} data={item.node} />);
});

// Result component
const Results = () => {
  const [searchString] = useContext(SearchContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  const fetch = () => {
    setData(null);
    setError(false);
    setLoading(true);

    if (searchString) {
      TmdbSearch(searchString)
        .then((res) => {
          setLoading(false);
          setData(res);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    } else {
      TmdbTrending()
        .then((res) => {
          setLoading(false);
          setData(res);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    }
  };

  useEffect(fetch, [searchString]);

  return (
    <section>
      <Container>
        <Title title={searchString} loading={loading} error={error} results={data && data.length} />
        <List data={data} />
      </Container>
    </section>
  );
};

export default Results;
