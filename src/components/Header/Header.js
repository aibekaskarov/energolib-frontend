import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Header.module.css';
import Search from '../Search/Search';
import { FaHome, FaBook, FaNewspaper, FaUser, FaInfoCircle, FaCommentDots, FaGlobe, FaSignInAlt, FaSignOutAlt, FaDoorOpen } from 'react-icons/fa';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { t, toggleLanguage, language } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const location = useLocation();
  const moreMenuRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreMenuOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMoreMenuOpen(false);
    setSidebarOpen(false);
  }, [location]);

  const mainNavItems = [
    { path: '/', label: t('nav.home'), icon: <FaHome /> },
    { path: '/catalog', label: t('nav.catalog'), icon: <FaBook /> },
    { path: '/news', label: t('nav.news'), icon: <FaNewspaper /> },
  ];

  const moreNavItems = [
    { path: '/persons', label: t('nav.persons'), icon: <FaUser /> },
    { path: '/about', label: t('nav.about'), icon: <FaInfoCircle /> },
    { path: '/feedback', label: t('nav.feedback'), icon: <FaCommentDots /> },
  ];

  return (
    <header className={styles.header} ref={sidebarRef}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logo}>
            <img src="/favicon.svg" alt="EnergoLib" className={styles.logoIcon} />
            <span className={styles.logoText}>EnergoLib</span>
          </Link>

          <nav className={styles.mainNav}>
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.searchSection}>
          <Search />
        </div>

        <div className={styles.rightSection} ref={moreMenuRef}>
          <div className={styles.moreMenu}>
            <button
              className={styles.moreButton}
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            >
              <span>Ещё</span>
              <svg className={`${styles.arrowIcon} ${moreMenuOpen ? styles.arrowOpen : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {moreMenuOpen && (
              <div className={styles.moreDropdown}>
                {moreNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={styles.dropdownLink}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <>
              <Link to="/user" className={styles.profileButton}>
                <svg className={styles.profileIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
              <button className={styles.logoutButton} onClick={logout}>
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <Link to="/auth/login" className={styles.loginButton}>
              {t('nav.login')}
            </Link>
          )}

          <button className={styles.langButton} onClick={toggleLanguage}>
            {language.toUpperCase()}
          </button>
        </div>

        <button
          className={styles.burgerButton}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Menu"
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`${styles.sidebarOverlay} ${sidebarOpen ? styles.overlayOpen : ''}`} onClick={() => setSidebarOpen(false)} />
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link to="/" className={styles.sidebarLogo} onClick={() => setSidebarOpen(false)}>
            <img src="/favicon.svg" alt="EnergoLib" className={styles.sidebarLogoIcon} />
            <span className={styles.sidebarLogoText}>EnergoLib</span>
          </Link>
          <button className={styles.closeButton} onClick={() => setSidebarOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.sidebarSearch}>
          <Search />
        </div>

        <nav className={styles.sidebarNav}>
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarSectionTitle}>Основное</h3>
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.sidebarNavLink} ${location.pathname === item.path ? styles.active : ''}`}
              >
                <span className={styles.sidebarLinkIcon}>{item.icon}</span>
                <span className={styles.sidebarLinkText}>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarSectionTitle}>Дополнительно</h3>
            {moreNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={styles.sidebarNavLink}
              >
                <span className={styles.sidebarLinkIcon}>{item.icon}</span>
                <span className={styles.sidebarLinkText}>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarSectionTitle}>Аккаунт</h3>
            {isAuthenticated ? (
              <>
                <Link to="/user" className={styles.sidebarNavLink}>
                  <span className={styles.sidebarLinkIcon}><FaUser /></span>
                  <span className={styles.sidebarLinkText}>{t('nav.profile')}</span>
                </Link>
                <button className={styles.sidebarLogout} onClick={() => { logout(); setSidebarOpen(false); }}>
                  <span className={styles.sidebarLinkIcon}><FaDoorOpen /></span>
                  <span className={styles.sidebarLinkText}>{t('nav.logout')}</span>
                </button>
              </>
            ) : (
              <Link to="/auth/login" className={styles.sidebarLogin}>
                <span className={styles.sidebarLinkIcon}><FaSignInAlt /></span>
                <span className={styles.sidebarLinkText}>{t('nav.login')}</span>
              </Link>
            )}
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.sidebarLangButton} onClick={toggleLanguage}>
            <FaGlobe /> {language.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
