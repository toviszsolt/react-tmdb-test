import React from 'react';
import styles from './Appbar.module.css';
import Container from './Container';
import String from '../../modules/Strings';

const Appbar = () => {
  return (
    <header className={styles.appbar}>
      <Container>{String.Appbar.title}</Container>
    </header>
  );
};

export default Appbar;
