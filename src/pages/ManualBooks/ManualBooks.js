import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../services/api';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from '../Catalog/Catalog.module.css';

const LIMIT = 24;

const ManualBooks = () => {
  const { t } = useLanguage();
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [search, setSearch] = useState('');
  const loaderRef = useRef(null);

  const fetchBooks = useCallback((currentPage, currentSearch, append = false) => {
    if (currentPage === 1) setInitialLoading(true);
    else setLoading(true);

    const params = { page: currentPage, limit: LIMIT, source: 'manual' };
    if (currentSearch) params.search = currentSearch;

    api.get('/books', { params })
      .then((res) => {
        const { books: data = [], total: tot = 0, page: p = 1 } = res.data;
        setBooks((prev) => append ? [...prev, ...data] : data);
        setTotal(tot);
        setHasMore(p * LIMIT < tot);
      })
      .catch(() => {
        if (!append) setBooks([]);
        setTotal(0);
        setHasMore(false);
      })
      .finally(() => {
        setInitialLoading(false);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchBooks(1, search, false);
  }, [search, fetchBooks]);

  useEffect(() => {
    if (page === 1) return;
    fetchBooks(page, search, true);
  }, [page]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !initialLoading) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, initialLoading]);

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <h1 className={styles.title}>Загруженные книги</h1>
        <p className={styles.subtitle}>Книги добавленные вручную администратором</p>

        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
            placeholder="Поиск по названию..."
          />
          {search && (
            <button
              className={styles.resetButton}
              onClick={() => setSearch('')}
              style={{ position: 'absolute', right: 12 }}
            >
              <FaTimes />
            </button>
          )}
        </div>

        {!initialLoading && books.length > 0 && (
          <p className={styles.count}>
            Загружено: <span className={styles.countNumber}>{books.length}</span> из <span className={styles.countNumber}>{total}</span>
          </p>
        )}

        {initialLoading ? (
          <div className={styles.loading}>{t('common.loading')}</div>
        ) : books.length === 0 ? (
          <div className={styles.empty}>Книги не найдены</div>
        ) : (
          <div className={styles.booksGrid}>
            {books.map((book) => (
              <Link to={`/book/${book.id}`} key={book.id} className={styles.bookCard}>
                <div className={styles.bookIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <div className={styles.bookInfo}>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>{book.author}</p>
                  <div className={styles.bookMeta}>
                    {book.year && <span className={styles.badge}>{book.year}</span>}
                    {book.specialty && <span className={styles.badge}>{book.specialty}</span>}
                    {book.language && <span className={styles.badge}>{book.language}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div ref={loaderRef} className={styles.loaderTrigger}>
          {loading && <div className={styles.loadingMore}>{t('common.loading')}</div>}
          {!hasMore && books.length > 0 && (
            <p className={styles.endMessage}>Все книги загружены</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManualBooks;
