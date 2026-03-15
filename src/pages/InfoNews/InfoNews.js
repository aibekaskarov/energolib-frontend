import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../services/api';
import { getMediaUrl } from '../../services/media';
import styles from './InfoNews.module.css';

const InfoNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/news/${id}`)
      .then((res) => setNews(res.data))
      .catch(() => setNews(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className={styles.loading}>{t('common.loading')}</div>;
  if (!news) return <div className={styles.error}>Новость не найдена</div>;

  return (
    <div className={styles.infoNews}>
      <div className={styles.container}>
        <button onClick={() => navigate('/news')} className={styles.backButton}>
          ← {t('news.backToNews')}
        </button>

        <article className={styles.article}>
          {news.imageUrl && (
            <div className={styles.image}>
              <img src={getMediaUrl(news.imageUrl)} alt={news.title} />
            </div>
          )}

          <h1 className={styles.title}>{news.title}</h1>

          <div className={styles.meta}>
            <span className={styles.date}>
              {new Date(news.createdAt).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default InfoNews;
