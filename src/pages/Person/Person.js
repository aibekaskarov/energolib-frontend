import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../services/api';
import { getMediaUrl } from '../../services/media';
import styles from './Person.module.css';

const Person = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/persons/${id}`)
      .then((res) => setPerson(res.data))
      .catch(() => setPerson(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className={styles.loading}>{t('common.loading')}</div>;
  if (!person) return <div className={styles.error}>Персона не найдена</div>;

  return (
    <div className={styles.person}>
      <div className={styles.container}>
        <button onClick={() => navigate('/persons')} className={styles.backButton}>
          ← Назад к списку
        </button>

        <div className={styles.content}>
          <div className={styles.image}>
            {person.imageUrl && <img src={getMediaUrl(person.imageUrl)} alt={person.name} />}
          </div>

          <div className={styles.info}>
            <h1 className={styles.name}>{person.name}</h1>
            <p className={styles.role}>{person.role}</p>
            {(person.birthYear || person.deathYear) && (
              <p className={styles.years}>
                {person.birthYear || '?'} — {person.deathYear || 'н.в.'}
              </p>
            )}

            {person.description && (
              <div className={styles.description}>
                <h3>Биография</h3>
                <p>{person.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Person;
