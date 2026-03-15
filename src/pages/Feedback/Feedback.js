import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Feedback.module.css';

const Feedback = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className={styles.feedback}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('feedback.title')}</h1>

        {submitted ? (
          <div className={styles.success}>
            <p>{t('feedback.sent')}</p>
            <button onClick={() => setSubmitted(false)} className={styles.newMessageButton}>
              Отправить новое сообщение
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>{t('feedback.name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{t('feedback.email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{t('feedback.message')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                rows={6}
                required
              />
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? t('common.loading') : t('feedback.send')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;
