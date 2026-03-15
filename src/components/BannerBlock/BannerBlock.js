import React from 'react';
import styles from './BannerBlock.module.css';

const BannerBlock = ({ title, subtitle, image, link }) => {
  return (
    <div className={styles.banner} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.overlay}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {link && (
          <a href={link} className={styles.button}>
            Подробнее
          </a>
        )}
      </div>
    </div>
  );
};

export default BannerBlock;
