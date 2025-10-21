import { useCallback } from 'react';
import { useSearchStore } from '@/stores';

export const usePagination = () => {
  const { search, query, pagination } = useSearchStore();

  const handlePageChange = useCallback(async (newOffset: number, selectedCategory?: string) => {
    await search({
      q: query,
      limit: pagination.limit,
      offset: newOffset,
      category: selectedCategory || undefined,
    });
    
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [search, query, pagination.limit]);

  const generatePaginationData = useCallback(() => {
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

    return {
      totalPages,
      currentPage,
      pages,
      hasPrev: pagination.hasPrev,
      hasNext: pagination.hasNext,
      offset: pagination.offset,
      limit: pagination.limit,
    };
  }, [pagination]);

  return {
    handlePageChange,
    generatePaginationData,
    pagination,
  };
};