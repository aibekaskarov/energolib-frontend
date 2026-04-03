import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return <div className={styles.error}>Пользователь не найден</div>;
  }

  const handleEdit = () => {
    setFullName(user.fullName || '');
    setError('');
    setEditing(true);
  };

  const handleSave = async () => {
    if (!fullName.trim()) return;
    setLoading(true);
    setError('');
    try {
      await updateProfile(fullName.trim());
      setEditing(false);
    } catch {
      setError('Ошибка при сохранении');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ← Назад
        </button>
        <h1 className={styles.title}>{t('profile.title')}</h1>

        <div className={styles.card}>
          <div className={styles.avatar}>
            {user.fullName?.charAt(0).toUpperCase() || 'U'}
          </div>

          <div className={styles.info}>
            <div className={styles.row}>
              <span className={styles.label}>{t('profile.name')}</span>
              {editing ? (
                <input
                  className={styles.input}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoFocus
                />
              ) : (
                <span className={styles.value}>{user.fullName || '—'}</span>
              )}
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

          {error && <div className={styles.errorMsg}>{error}</div>}

          {editing ? (
            <div className={styles.actions}>
              <button className={styles.saveButton} onClick={handleSave} disabled={loading}>
                {loading ? 'Сохраняем...' : 'Сохранить'}
              </button>
              <button className={styles.cancelButton} onClick={() => setEditing(false)} disabled={loading}>
                Отмена
              </button>
            </div>
          ) : (
            <button className={styles.editButton} onClick={handleEdit}>
              {t('profile.editProfile')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
