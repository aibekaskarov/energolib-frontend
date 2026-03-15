import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../services/api';
import { getMediaUrl } from '../../services/media';
import styles from './News.module.css';

const News = () => {
  const { t } = useLanguage();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/news')
      .then((res) => setNews(res.data || []))
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.loading}>{t('common.loading')}</div>;

  return (
    <div className={styles.news}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('news.title')}</h1>

        {news.length === 0 ? (
          <div className={styles.empty}>Новостей пока нет</div>
        ) : (
          <div className={styles.grid}>
            {news.map((item) => (
              <Link to={`/news/${item.id}`} key={item.id} className={styles.card}>
                <div className={styles.image}>
                  {item.imageUrl && <img src={getMediaUrl(item.imageUrl)} alt={item.title} />}
                </div>
                <div className={styles.content}>
                  <span className={styles.date}>
                    {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.excerpt}>
                    {item.content?.replace(/<[^>]+>/g, '').slice(0, 120)}...
                  </p>
                  <span className={styles.readMore}>{t('news.readMore')}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
