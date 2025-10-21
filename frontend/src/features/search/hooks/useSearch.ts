import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '@/stores';
import type { SearchParams } from '@/types';

/**
 * Custom hook for search functionality
 * Encapsulates search logic and navigation
 */
export const useSearch = () => {
  const navigate = useNavigate();
  const { search, isLoading, error, clearError } = useSearchStore();

  const performSearch = useCallback(async (params: SearchParams) => {
    try {
      await search(params);
      return { success: true };
    } catch (err) {
      console.error('Search failed:', err);
      return { success: false, error: err };
    }
  }, [search]);

  const searchAndNavigate = useCallback(async (query: string) => {
    const result = await performSearch({ q: query, limit: 10, offset: 0 });
    if (result.success) {
      navigate('/results');
    }
    return result;
  }, [performSearch, navigate]);

  const searchWithFilters = useCallback(async (
    query: string, 
    filters: { category?: string; featured?: boolean } = {}
  ) => {
    return performSearch({
      q: query,
      limit: 10,
      offset: 0,
      ...filters,
    });
  }, [performSearch]);

  return {
    // Actions
    performSearch,
    searchAndNavigate,
    searchWithFilters,
    clearError,
    
    // State
    isLoading,
    error,
  };
};