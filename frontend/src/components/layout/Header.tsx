import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.hamburger}>
        <div className={styles.hamburgerLine}></div>
        <div className={styles.hamburgerLine}></div>
        <div className={styles.hamburgerLine}></div>
      </div>
      
      <nav className={styles.nav}>
        <Link 
          to="/" 
          className={`${styles.navItem} ${location.pathname === '/' ? styles.active : ''}`}
        >
          Search
        </Link>
        <Link 
          to="/results" 
          className={`${styles.navItem} ${location.pathname === '/results' ? styles.active : ''}`}
        >
          Results
        </Link>
        <div className={styles.navItem}>VK</div>
      </nav>
    </header>
  );
};

export default Header;