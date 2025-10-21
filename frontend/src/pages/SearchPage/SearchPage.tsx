import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '@/stores';
import { SearchBar } from '@/features/search';
import { Header } from '@/components/layout';
import styles from './SearchPage.module.css';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useSearchStore();

  const handleSearch = async (query: string) => {
    await search({ q: query, limit: 10, offset: 0 });
    navigate('/results');
  };

  // throw new Error();

  return (
    <div className={styles.searchPage}>
      <Header />
      
      <main className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Discover Amazing Travel Experiences
          </h1>
          <p className={styles.subtitle}>
            Search through our curated collection of unique travel experiences and adventures
          </p>
          
          <div className={styles.searchSection}>
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search destinations, experiences, or activities..."
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Powered by <span className={styles.brandFooter}>flydubai</span> travel experiences
        </p>
      </footer>
    </div>
  );
};

export default SearchPage;