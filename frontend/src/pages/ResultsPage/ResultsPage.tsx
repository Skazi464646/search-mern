import React from 'react';
import { Header } from '@/components/layout';
import { SearchBar } from '@/features/search';
import { useResultsPage } from './hooks';
import {
  CategoryFilters,
  EmptyState,
  ErrorMessage,
  ExperienceGrid,
  LoadingGrid,
  PaginationControls,
} from './components';
import styles from './ResultsPage.module.css';

const ResultsPage: React.FC = () => {
  const {
    // State
    selectedCategory,
    results,
    pagination,
    isLoading,
    error,
    query,
    categories,
    paginationData,
    skeletonElements,
    resultsCountText,

    // Handlers
    handleSearch,
    handleCategoryFilter,
    handleExperienceClick,
    handleErrorDismiss,
    handlePrevPage,
    handleNextPage,
    handlePageClick,
  } = useResultsPage();

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
          
          <CategoryFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryFilter={handleCategoryFilter}
          />
        </div>

        {error && (
          <ErrorMessage
            error={error}
            onDismiss={handleErrorDismiss}
          />
        )}

        <div className={styles.resultsHeader}>
          <div className={styles.resultsCount}>
            {resultsCountText}
          </div>
        </div>

        {isLoading ? (
          <LoadingGrid skeletonElements={skeletonElements} />
        ) : results.length > 0 ? (
          <>
            <ExperienceGrid
              experiences={results}
              onExperienceClick={handleExperienceClick}
            />
            <PaginationControls
              pagination={pagination}
              paginationData={paginationData}
              isLoading={isLoading}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              onPageClick={handlePageClick}
            />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default ResultsPage;