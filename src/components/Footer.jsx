import React from 'react';
import styles from './Footer.module.css';
import Container from './Container';
import String from './Strings';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div>{String.Footer.textCopyright}</div>
        <a href={String.Footer.githubUrl} target="_blank" rel="noreferrer">
          {String.Footer.githubTitle}
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
