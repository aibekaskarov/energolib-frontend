import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../services/api';
import styles from './Book.module.css';

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    api.get(`/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(() => setError('Книга не найдена'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (isReading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isReading]);

  if (loading) return <div className={styles.loading}>{t('common.loading')}</div>;
  if (error || !book) return <div className={styles.error}>{error || 'Книга не найдена'}</div>;

  return (
    <div className={styles.book}>
      <div className={styles.container}>
        <button onClick={() => navigate('/catalog')} className={styles.backButton}>
          ← {t('book.backToCatalog')}
        </button>

        <div className={styles.content}>
          <div className={styles.info}>
            <h1 className={styles.title}>{book.title}</h1>
            <p className={styles.author}>{t('book.author')}: {book.author}</p>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{t('book.year')}</span>
                <span className={styles.metaValue}>{book.year}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{t('book.language')}</span>
                <span className={styles.metaValue}>{book.language}</span>
              </div>
              {book.specialty && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>{t('catalog.filterBySpecialty')}</span>
                  <span className={styles.metaValue}>{book.specialty}</span>
                </div>
              )}
            </div>

            {book.description && (
              <div className={styles.description}>
                <h3>{t('book.description')}</h3>
                <p>{book.description}</p>
              </div>
            )}

            {isAuthenticated ? (
              book.fileUrl ? (
                <button onClick={() => setIsReading(true)} className={styles.readButton}>
                  {t('book.read')}
                </button>
              ) : null
            ) : (
              <div className={styles.loginPrompt}>
                <p>{t('book.loginToRead')}</p>
                <button onClick={() => navigate('/auth/login')} className={styles.loginButton}>
                  {t('nav.login')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isReading && (
        <div
          className={styles.readerOverlay}
          onClick={(e) => { if (e.target === e.currentTarget) setIsReading(false); }}
        >
          <div className={styles.readerModal}>
            <div className={styles.readerHeader}>
              <span className={styles.readerTitle}>{book.title}</span>
              <button onClick={() => setIsReading(false)} className={styles.readerClose}>✕</button>
            </div>
            <iframe
              src={book.fileUrl}
              width="100%"
              height="100%"
              allowFullScreen
              title={book.title}
              className={styles.readerFrame}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
