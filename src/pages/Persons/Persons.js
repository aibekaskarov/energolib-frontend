import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../services/api';
import { getMediaUrl } from '../../services/media';
import styles from './Persons.module.css';

const Persons = () => {
  const { t } = useLanguage();
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/persons')
      .then((res) => {
        const data = res.data;
        setPersons(Array.isArray(data) ? data : (data?.content || []));
      })
      .catch(() => setPersons([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.loading}>{t('common.loading')}</div>;

  return (
    <div className={styles.persons}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('persons.title')}</h1>

        {persons.length === 0 ? (
          <div className={styles.empty}>Персоны не найдены</div>
        ) : (
          <div className={styles.grid}>
            {persons.map((person) => (
              <Link to={`/persons/${person.id}`} key={person.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <div className={styles.image}>
                    {person.imageUrl && <img src={getMediaUrl(person.imageUrl)} alt={person.name} />}
                  </div>
                </div>
                <h3 className={styles.name}>{person.name}</h3>
                <p className={styles.role}>{person.role}</p>
                <span className={styles.link}>{t('persons.viewDetails')}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Persons;
