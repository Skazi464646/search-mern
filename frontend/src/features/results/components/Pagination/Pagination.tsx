import React from 'react';
import { usePagination } from '../../hooks';
import styles from './Pagination.module.css';

interface PaginationProps {
  selectedCategory?: string;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ selectedCategory, isLoading = false }) => {
  const { handlePageChange, generatePaginationData } = usePagination();
  const paginationData = generatePaginationData();

  if (!paginationData) return null;

  const {
    totalPages,
    currentPage,
    pages,
    hasPrev,
    hasNext,
    offset,
    limit,
  } = paginationData;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={() => handlePageChange(offset - limit, selectedCategory)}
        disabled={!hasPrev || isLoading}
      >
        ←
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.paginationButton} ${
            page === currentPage ? styles.active : ''
          }`}
          onClick={() => handlePageChange((page - 1) * limit, selectedCategory)}
          disabled={isLoading}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.paginationButton}
        onClick={() => handlePageChange(offset + limit, selectedCategory)}
        disabled={!hasNext || isLoading}
      >
        →
      </button>

      <div className={styles.paginationInfo}>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default React.memo(Pagination);