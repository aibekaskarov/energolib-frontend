import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../services/api';
import styles from './Catalog.module.css';
import { FaSearch, FaTimes } from 'react-icons/fa';

const LIMIT = 24;

const GENRES = [
  'Электроэнергетика',
  'Электротехника',
  'Теплоэнергетика',
  'Автоматизация',
  'Информационные технологии',
  'Математика',
  'Физика',
  'Экономика',
  'Химия',
  'Экология',
];

const Catalog = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const loaderRef = useRef(null);

  const [filters, setFilters] = useState({
    specialty: searchParams.get('specialty') || '',
    title: searchParams.get('search') || '',
  });

  const fetchBooks = useCallback((currentPage, currentFilters, append = false) => {
    if (currentPage === 1) setInitialLoading(true);
    else setLoading(true);

    const params = { page: currentPage, limit: LIMIT };
    if (currentFilters.specialty) params.specialty = currentFilters.specialty;
    if (currentFilters.title) params.search = currentFilters.title;

    api.get('/books', { params })
      .then((res) => {
        const { books: data = [], total: t = 0, page: p = 1 } = res.data;
        setBooks((prev) => append ? [...prev, ...data] : data);
        setTotal(t);
        setHasMore(p * LIMIT < t);
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

  // При смене фильтров — сброс и загрузка с 1 страницы
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchBooks(1, filters, false);

    const urlParams = new URLSearchParams();
    if (filters.specialty) urlParams.set('specialty', filters.specialty);
    if (filters.title) urlParams.set('search', filters.title);
    setSearchParams(urlParams);
  }, [filters]);

  // При смене страницы (кроме 1) — дозагрузка
  useEffect(() => {
    if (page === 1) return;
    fetchBooks(page, filters, true);
  }, [page]);

  // IntersectionObserver на loader-элемент
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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({ specialty: '', title: '' });
  };

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('catalog.title')}</h1>
        <p className={styles.subtitle}>{t('home.subtitle')}</p>

        {/* Search bar */}
        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            value={filters.title}
            onChange={(e) => handleFilterChange('title', e.target.value)}
            className={styles.searchInput}
            placeholder={t('home.search')}
          />
        </div>

        {/* Genre buttons */}
        <div className={styles.genreRow}>
          <button
            className={`${styles.genreBtn} ${filters.specialty === '' ? styles.genreBtnActive : ''}`}
            onClick={() => handleFilterChange('specialty', '')}
          >
            Все
          </button>
          {GENRES.map((g) => (
            <button
              key={g}
              className={`${styles.genreBtn} ${filters.specialty === g ? styles.genreBtnActive : ''}`}
              onClick={() => handleFilterChange('specialty', g)}
            >
              {g}
            </button>
          ))}
          {(filters.specialty || filters.title) && (
            <button className={styles.resetButton} onClick={handleReset}>
              <FaTimes />
            </button>
          )}
        </div>

        {/* Count */}
        {!initialLoading && books.length > 0 && (
          <p className={styles.count}>
            Загружено: <span className={styles.countNumber}>{books.length}</span> из <span className={styles.countNumber}>{total}</span>
          </p>
        )}

        {/* Books grid */}
        {initialLoading ? (
          <div className={styles.loading}>{t('common.loading')}</div>
        ) : books.length === 0 ? (
          <div className={styles.empty}>{t('catalog.noBooks')}</div>
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

        {/* Infinite scroll trigger */}
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

export default Catalog;
