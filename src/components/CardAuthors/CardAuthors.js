import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardAuthors.module.css';

const CardAuthors = ({ id, name, role, image }) => {
  return (
    <Link to={`/persons/${id}`} className={styles.card}>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.role}>{role}</p>
    </Link>
  );
};

export default CardAuthors;
