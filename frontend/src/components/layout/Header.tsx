import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/searchStore';
import styles from './Header.module.css';

interface HeaderProps {
  onCategorySelect?: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCategorySelect }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = useSearchStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const popularCategories = [
    'Wine & Dine',
    'Cultural',
    'Adventure',
    'Nature',
    'Heritage',
    'Beach',
    'Food'
  ];

  const handleCategoryClick = async (category: string) => {
    await search({ q: category, limit: 10, offset: 0, category });
    navigate('/results');
    setIsMenuOpen(false);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerActive : ''}`}></div>
          <div className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerActive : ''}`}></div>
          <div className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerActive : ''}`}></div>
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

      {/* Overlay */}
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}

      {/* Slide-out Menu */}
      <div className={`${styles.slideMenu} ${isMenuOpen ? styles.slideMenuOpen : ''}`}>
        <div className={styles.menuHeader}>
          <h3 className={styles.menuTitle}>Menu</h3>
          <button className={styles.closeButton} onClick={closeMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
          </button>
        </div>
        
        <nav className={styles.menuContent}>
          {popularCategories.map((category) => (
            <button
              key={category}
              className={styles.categoryItem}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;