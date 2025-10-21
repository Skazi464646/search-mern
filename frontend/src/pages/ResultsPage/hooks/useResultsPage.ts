import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '@/stores';
import type { Experience } from '@/types';

export const useResultsPage = () => {
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

  // Memoized categories array to prevent re-renders
  const categories = useMemo(() => [
    'Wine & Dine', 
    'Cultural', 
    'Adventure', 
    'Nature', 
    'Heritage', 
    'Beach', 
    'Food'
  ], []);

  // Redirect to search page if no search has been performed
  useEffect(() => {
    if (!query && results.length === 0 && !isLoading) {
      navigate('/');
    }
  }, [query, results.length, isLoading, navigate]);

  // Memoized search handler to prevent re-creation on every render
  const handleSearch = useCallback(async (newQuery: string) => {
    await search({
      q: newQuery,
      limit: 10,
      offset: 0,
      category: selectedCategory || undefined,
    });
  }, [search, selectedCategory]);

  // Memoized category filter handler
  const handleCategoryFilter = useCallback(async (category: string) => {
    const newCategory = category === selectedCategory ? '' : category;
    setSelectedCategory(newCategory);
    
    await search({
      q: query,
      limit: 10,
      offset: 0,
      category: newCategory || undefined,
    });
  }, [search, query, selectedCategory]);

  // Memoized page change handler
  const handlePageChange = useCallback(async (newOffset: number) => {
    await search({
      q: query,
      limit: pagination.limit,
      offset: newOffset,
      category: selectedCategory || undefined,
    });
    
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [search, query, pagination.limit, selectedCategory]);

  // Memoized experience click handler
  const handleExperienceClick = useCallback((experience: Experience) => {
    console.log('Experience clicked:', experience);
    // Here you could navigate to a detail page
    // navigate(`/experience/${experience.id}`);
  }, []);

  // Memoized error dismissal handler
  const handleErrorDismiss = useCallback(() => {
    clearError();
  }, [clearError]);

  // Memoized pagination calculation
  const paginationData = useMemo(() => {
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
      startPage,
      endPage,
    };
  }, [pagination.total, pagination.limit, pagination.offset]);

  // Memoized skeleton elements to prevent re-creation
  const skeletonElements = useMemo(() => 
    Array.from({ length: 8 }, (_, index) => index),
    []
  );

  // Memoized results count text
  const resultsCountText = useMemo(() => {
    if (isLoading) return '';
    return `${pagination.total} ${pagination.total === 1 ? 'experience' : 'experiences'} found`;
  }, [pagination.total, isLoading]);

  // Memoized pagination button handlers
  const handlePrevPage = useCallback(() => {
    handlePageChange(pagination.offset - pagination.limit);
  }, [handlePageChange, pagination.offset, pagination.limit]);

  const handleNextPage = useCallback(() => {
    handlePageChange(pagination.offset + pagination.limit);
  }, [handlePageChange, pagination.offset, pagination.limit]);

  const handlePageClick = useCallback((page: number) => {
    handlePageChange((page - 1) * pagination.limit);
  }, [handlePageChange, pagination.limit]);

  return {
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
    handlePageChange,
    handleExperienceClick,
    handleErrorDismiss,
    handlePrevPage,
    handleNextPage,
    handlePageClick,
  };
};