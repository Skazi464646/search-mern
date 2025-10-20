import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { SearchStore, SearchParams, Pagination } from '../types';
import { apiService } from '../services/api';

const initialPagination: Pagination = {
  total: 0,
  limit: 10,
  offset: 0,
  hasNext: false,
  hasPrev: false,
};

export const useSearchStore = create<SearchStore>()(
  devtools(
    (set) => ({
      // State
      query: '',
      results: [],
      suggestions: [],
      pagination: initialPagination,
      isLoading: false,
      isLoadingSuggestions: false,
      error: null,

      // Actions
      setQuery: (query: string) => {
        set({ query }, false, 'setQuery');
      },

      search: async (params: SearchParams) => {
        set({ isLoading: true, error: null }, false, 'search/start');
        
        try {
          const response = await apiService.search(params);
          
          if (response.success) {
            set({
              results: response.data.results,
              pagination: response.data.pagination,
              isLoading: false,
              query: params.q,
            }, false, 'search/success');
          } else {
            throw new Error('Search failed');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Search failed';
          set({
            error: errorMessage,
            isLoading: false,
            results: [],
            pagination: initialPagination,
          }, false, 'search/error');
        }
      },

      autocomplete: async (query: string) => {
        if (query.length < 2) {
          set({ suggestions: [] }, false, 'autocomplete/clear');
          return;
        }

        set({ isLoadingSuggestions: true }, false, 'autocomplete/start');
        
        try {
          const response = await apiService.autocomplete(query);
          
          if (response.success) {
            set({
              suggestions: response.data.suggestions,
              isLoadingSuggestions: false,
            }, false, 'autocomplete/success');
          } else {
            throw new Error('Autocomplete failed');
          }
        } catch (error) {
          console.error('Autocomplete error:', error);
          set({
            suggestions: [],
            isLoadingSuggestions: false,
          }, false, 'autocomplete/error');
        }
      },

      clearResults: () => {
        set({
          results: [],
          suggestions: [],
          pagination: initialPagination,
          query: '',
          error: null,
        }, false, 'clearResults');
      },

      clearError: () => {
        set({ error: null }, false, 'clearError');
      },
    }),
    {
      name: 'search-store',
    }
  )
);