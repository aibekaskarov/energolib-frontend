import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [error, setError] = useState('');
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    setError('');
    try {
      await loginWithGoogle(credentialResponse.credential);
      navigate('/');
    } catch {
      setError('Ошибка входа через Google');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход</h1>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.googleWrapper}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => setError('Ошибка входа через Google')}
            theme="filled_black"
            size="large"
            width="320"
            text="signin_with"
            locale="ru"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
