import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearchStore } from '@/stores';
import { Header } from '@/components/layout';
import { SearchBar } from '@/features/search';
import { ExperienceCard, ExperienceCardSkeleton } from '@/features/results';
import type { Experience } from '@/types';
import styles from './ResultsPage.module.css';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const {
    results,
    pagination,
    isLoading,
    error,
    query,
    search,
    clearError,
  } = useSearchStore();

  const categories = ['Wine & Dine', 'Cultural', 'Adventure', 'Nature', 'Heritage', 'Beach', 'Food'];

  useEffect(() => {
    // If no search has been performed, redirect to search page
    if (!query && results.length === 0 && !isLoading) {
      debugger
      navigate('/');
    }
  }, [query, results.length, isLoading, navigate]);

  const handleSearch = async (newQuery: string) => {
    await search({
      q: newQuery,
      limit: 10,
      offset: 0,
      category: selectedCategory || undefined,
    });
  };

  const handleCategoryFilter = async (category: string) => {
    const newCategory = category === selectedCategory ? '' : category;
    setSelectedCategory(newCategory);
    
    await search({
      q: query,
      limit: 10,
      offset: 0,
      category: newCategory || undefined,
    });
  };

  const handlePageChange = async (newOffset: number) => {
    await search({
      q: query,
      limit: pagination.limit,
      offset: newOffset,
      category: selectedCategory || undefined,
    });
    
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExperienceClick = (experience: Experience) => {
    console.log('Experience clicked:', experience);
    // Here you could navigate to a detail page
    // navigate(`/experience/${experience.id}`);
  };

  const renderPagination = () => {
    if (pagination.total <= pagination.limit) return null;

    const totalPages = Math.ceil(pagination.total / pagination.limit);
    const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
    const pages = [];

    // Calculate page range to show
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={() => handlePageChange(pagination.offset - pagination.limit)}
          disabled={!pagination.hasPrev || isLoading}
        >
          ←
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`${styles.paginationButton} ${
              page === currentPage ? styles.active : ''
            }`}
            onClick={() => handlePageChange((page - 1) * pagination.limit)}
            disabled={isLoading}
          >
            {page}
          </button>
        ))}

        <button
          className={styles.paginationButton}
          onClick={() => handlePageChange(pagination.offset + pagination.limit)}
          disabled={!pagination.hasNext || isLoading}
        >
          →
        </button>

        <div className={styles.paginationInfo}>
          Page {currentPage} of {totalPages}
        </div>
      </div>
    );
  };

  const renderSkeletons = () => {
    return Array.from({ length: 8 }, (_, index) => (
      <ExperienceCardSkeleton key={index} />
    ));
  };

  return (
    <div className={styles.resultsPage}>
      <Header />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Search results</h1>
          {query && (
            <p className={styles.subtitle}>
              Showing results for "{query}"
            </p>
          )}
        </div>

        <div className={styles.searchSection}>
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Refine your search..."
          />
          
          <div className={styles.filters}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${
                  selectedCategory === category ? styles.active : ''
                }`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
            <button onClick={clearError} style={{ marginLeft: '1rem' }}>
              Dismiss
            </button>
          </div>
        )}

        <div className={styles.resultsHeader}>
          <div className={styles.resultsCount}>
            {!isLoading && (
              <>
                {pagination.total} {pagination.total === 1 ? 'experience' : 'experiences'} found
              </>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loadingGrid}>
            {renderSkeletons()}
          </div>
        ) : results.length > 0 ? (
          <>
            <div className={styles.grid}>
              {results.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  onClick={handleExperienceClick}
                />
              ))}
            </div>
            {renderPagination()}
          </>
        ) : (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyStateTitle}>No experiences found</h2>
            <p className={styles.emptyStateDescription}>
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Link to="/" className={styles.backButton}>
              ← Back to Search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;