import React from 'react';
import styles from './Sponsor.module.css';

const Sponsor = ({ name, logo, link }) => {
  return (
    <div className={styles.sponsor}>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <img src={logo} alt={name} className={styles.logo} />
          <span className={styles.name}>{name}</span>
        </a>
      ) : (
        <div className={styles.noLink}>
          <img src={logo} alt={name} className={styles.logo} />
          <span className={styles.name}>{name}</span>
        </div>
      )}
    </div>
  );
};

export default Sponsor;
