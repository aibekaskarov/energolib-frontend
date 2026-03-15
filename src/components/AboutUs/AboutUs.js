import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.aboutUs}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('about.title')}</h2>
        <p className={styles.description}>{t('about.description')}</p>
      </div>
    </div>
  );
};

export default AboutUs;
