import React from 'react';
import styles from './Hero.module.css';

const Hero = ({ children }) => {
  return <section className={styles.hero}>{children}</section>;
};

export default Hero;
