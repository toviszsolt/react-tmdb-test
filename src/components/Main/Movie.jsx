/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import WikipediaSearch from '../../modules/WikipediaSearch';
import PosterPlaceholder from '../../images/moviePlaceholder.png';
import Card from '../Common/Card';
import String from '../../modules/Strings';
import styles from './Movie.module.css';

// Date formatter
const dateFormat = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Image poster component
const Poster = ({ data }) => {
  return (
    <img
      loading="lazy"
      src={data.poster || PosterPlaceholder}
      alt={`${data.title} poster`}
      className={styles.poster}
    />
  );
};

// Basic details component
const Details = ({ data, onClick }) => {
  const genres = (data.genres || []).map((el) => el.name).join(', ');
  const type = data.__typename.replace('Result', '');

  return (
    <div>
      <h3 className={`${styles.title} ${styles.textTrim}`} onClick={onClick} aria-hidden="true">
        {data.title} &mdash; {type}
      </h3>
      <div className={styles.textTrim}>{genres}</div>
      <div className={styles.released}>{dateFormat(data.releaseDate)}</div>
      <div className={styles.description}>{data.overview}</div>
      <div className={styles.rating}>{data.rating.toFixed(1)}</div>
    </div>
  );
};

// ExternalLink component
const ExtrenalLink = ({ href }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={styles.textTrim}>
      {href}
    </a>
  );
};

// Extra details comaponent
const Extra = ({ data, extra, error, onClick, className }) => {
  const imdbUrl = data && data.externalIds && `https://imdb.com/title/${data.externalIds.imdb}`;
  const wikipediaUrl = extra && extra.canonicalurl;
  const extract = extra && extra.extract;

  const imdbLink = imdbUrl ? <ExtrenalLink href={imdbUrl} /> : '';

  const wikipediaLink = wikipediaUrl ? <ExtrenalLink href={wikipediaUrl} /> : '';

  const errorText = error ? String.Main.InfoError : '';

  if (extra || error) {
    return (
      <div className={className}>
        <div className={`${styles.title} ${styles.textTrim}`} onClick={onClick} aria-hidden="true">
          {data.title} &mdash; {String.Main.Movie.titleExternalResources}
        </div>
        <div>
          {imdbLink}
          {wikipediaLink}
          {errorText}
        </div>
        <div className={styles.description}>{extract}</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div>{String.Main.InfoLoading}</div>
    </div>
  );
};

// Movie component
const Movie = ({ data }) => {
  const [toggle, setToggle] = useState(false);
  const [extra, setExtra] = useState(null);
  const [hasError, setHasError] = useState(false);

  const year = new Date(data.releaseDate).getFullYear();
  const searchString =
    data.__typename === 'TVShowResult'
      ? `${data.title} ${year} tv series`
      : `${data.title} ${year} film`;

  const onClick = () => {
    setHasError(false);
    setToggle((prev) => !prev);

    if (!extra) {
      WikipediaSearch(searchString)
        .then((res) => setExtra(res))
        .catch(() => setHasError(true));
    }
  };

  return (
    <Card>
      <Poster data={data} />
      <div className={styles.details}>
        <Details data={data} onClick={onClick} />
        <Extra
          data={data}
          extra={extra}
          error={hasError}
          onClick={onClick}
          className={`${styles.extra} ${toggle ? styles.active : ''}`}
        />
      </div>
    </Card>
  );
};

export default Movie;
