import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>EnergoLib</h3>
            <p className={styles.description}>
              Электронная библиотека для студентов и преподавателей
            </p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Навигация</h4>
            <ul className={styles.links}>
              <li><a href="/">Главная</a></li>
              <li><a href="/catalog">Каталог</a></li>
              <li><a href="/persons">Персоны</a></li>
              <li><a href="/news">Новости</a></li>
              <li><a href="/about">О нас</a></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Контакты</h4>
            <p className={styles.contact}>Email: info@energolib.kz</p>
            <p className={styles.contact}>Тел: +7 (777) 123-45-67</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© {year} EnergoLib. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
