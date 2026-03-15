import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Collection.module.css';

const Collection = ({ id, title, description, books = [] }) => {
  return (
    <div className={styles.collection}>
      <Link to={`/collection/${id}`} className={styles.link}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.booksCount}>
          {books.length} {books.length === 1 ? 'книга' : books.length < 5 ? 'книги' : 'книг'}
        </div>
      </Link>
    </div>
  );
};

export default Collection;
