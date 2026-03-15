import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    return <div className={styles.error}>Пользователь не найден</div>;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('profile.title')}</h1>

        <div className={styles.card}>
          <div className={styles.avatar}>
            {user.fullName?.charAt(0).toUpperCase() || 'U'}
          </div>

          <div className={styles.info}>
            <div className={styles.row}>
              <span className={styles.label}>{t('profile.name')}</span>
              <span className={styles.value}>{user.fullName || '—'}</span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>{t('profile.email')}</span>
              <span className={styles.value}>{user.email || '—'}</span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>{t('profile.role')}</span>
              <span className={styles.value}>
                {user.role === 'admin' ? 'Администратор' : 'Студент'}
              </span>
            </div>
          </div>

          <button className={styles.editButton}>
            {t('profile.editProfile')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
