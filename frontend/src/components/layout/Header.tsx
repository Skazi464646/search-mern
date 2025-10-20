import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/searchStore';
import styles from './Header.module.css';

interface HeaderProps {
  onCategorySelect?: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCategorySelect }) => {
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
          <div className={styles.navItem}>
            <div className={styles.notificationIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
              <div className={styles.notificationDot}></div>
            </div>
          </div>
          
          <div className={styles.navItem}>
            <div className={styles.vkButton}>VK</div>
          </div>
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