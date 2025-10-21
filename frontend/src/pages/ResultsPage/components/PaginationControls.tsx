import React from 'react';
import type { Pagination } from '@/types';
import styles from '../ResultsPage.module.css';

interface PaginationControlsProps {
  pagination: Pagination;
  paginationData: {
    totalPages: number;
    currentPage: number;
    pages: number[];
  } | null;
  isLoading: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPageClick: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = React.memo(({
  pagination,
  paginationData,
  isLoading,
  onPrevPage,
  onNextPage,
  onPageClick,
}) => {
  if (!paginationData) return null;

  const { totalPages, currentPage, pages } = paginationData;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={onPrevPage}
        disabled={!pagination.hasPrev || isLoading}
        aria-label="Previous page"
      >
        ←
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.paginationButton} ${
            page === currentPage ? styles.active : ''
          }`}
          onClick={() => onPageClick(page)}
          disabled={isLoading}
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.paginationButton}
        onClick={onNextPage}
        disabled={!pagination.hasNext || isLoading}
        aria-label="Next page"
      >
        →
      </button>

      <div className={styles.paginationInfo}>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
});

PaginationControls.displayName = 'PaginationControls';