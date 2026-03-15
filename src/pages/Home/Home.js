import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import SlideBannerBlock from '../../components/SlideBannerBlock/SlideBannerBlock';
import Search from '../../components/Search/Search';
import api from '../../services/api';
import { getMediaUrl } from '../../services/media';
import styles from './Home.module.css';

const Home = () => {
  const { t } = useLanguage();
  const [featuredPersons, setFeaturedPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/persons').catch(() => ({ data: [] }))
      .then((personsRes) => {
        const personsData = personsRes.data;
        setFeaturedPersons(Array.isArray(personsData) ? personsData.slice(0, 3) : (personsData?.content || []).slice(0, 3));
      }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className={styles.loading}>{t('common.loading')}</div>;
  }

  return (
    <div className={styles.home}>
      <SlideBannerBlock />

      <section className={styles.searchSection}>
        <div className={styles.container}>
          <h1 className={styles.welcome}>{t('home.welcome')}</h1>
          <p className={styles.subtitle}>{t('home.subtitle')}</p>
          <Search />
        </div>
      </section>

<section className={styles.personsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('home.featuredPersons')}</h2>
            <Link to="/persons" className={styles.viewAll}>
              {t('home.viewAll')} →
            </Link>
          </div>

          <div className={styles.personsGrid}>
            {featuredPersons.map((person) => (
              <Link to={`/persons/${person.id}`} key={person.id} className={styles.personCard}>
                {person.imageUrl && (
                  <div className={styles.personImage}>
                    <img src={getMediaUrl(person.imageUrl)} alt={person.name} />
                  </div>
                )}
                <h3 className={styles.personName}>{person.name}</h3>
                <p className={styles.personRole}>{person.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
