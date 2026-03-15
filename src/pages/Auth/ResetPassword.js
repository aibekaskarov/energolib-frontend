import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './ResetPassword.module.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка сброса пароля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t('auth.resetPassword')}</h1>

        {error && <div className={styles.error}>{error}</div>}

        {success ? (
          <div className={styles.success}>
            <p>Письмо для сброса пароля отправлено на {email}</p>
            <Link to="/auth/login" className={styles.backLink}>
              {t('auth.backToLogin')}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>{t('auth.email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? t('common.loading') : t('auth.submit')}
            </button>
          </form>
        )}

        <Link to="/auth/login" className={styles.backLink}>
          ← {t('auth.backToLogin')}
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
