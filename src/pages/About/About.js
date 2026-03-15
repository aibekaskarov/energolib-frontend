import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaBook, FaSearch, FaGlobe } from 'react-icons/fa';
import styles from './About.module.css';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.about}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('about.title')}</h1>

        <div className={styles.content}>
          <p className={styles.description}>{t('about.description')}</p>

          <div className={styles.features}>
            <h2 className={styles.featuresTitle}>{t('about.features')}</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}><FaBook /></div>
                <h3>{t('about.feature1')}</h3>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}><FaSearch /></div>
                <h3>{t('about.feature2')}</h3>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}><FaGlobe /></div>
                <h3>{t('about.feature3')}</h3>
              </div>
            </div>
          </div>

          <div className={styles.info}>
            <h2>Информация</h2>
            <p>
              EnergoLib — это современная электронная библиотека, созданная для обеспечения 
              студентов и преподавателей качественными учебными материалами. Наша миссия — 
              сделать образование доступным и удобным.
            </p>
            <p>
              В нашем каталоге представлены книги по всем специальностям колледжа: 
              информационные технологии, энергетика, математика, физика, гуманитарные науки 
              и многие другие.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
