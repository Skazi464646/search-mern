import { useState, useCallback } from 'react';
import { useSearchStore } from '@/stores';

export const useResultsFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { search, query } = useSearchStore();

  const categories = ['Wine & Dine', 'Cultural', 'Adventure', 'Nature', 'Heritage', 'Beach', 'Food'];

  const handleCategoryFilter = useCallback(async (category: string) => {
    const newCategory = category === selectedCategory ? '' : category;
    setSelectedCategory(newCategory);
    
    await search({
      q: query,
      limit: 10,
      offset: 0,
      category: newCategory || undefined,
    });
  }, [selectedCategory, search, query]);

  const handleSearch = useCallback(async (newQuery: string) => {
    await search({
      q: newQuery,
      limit: 10,
      offset: 0,
      category: selectedCategory || undefined,
    });
  }, [search, selectedCategory]);

  return {
    selectedCategory,
    categories,
    handleCategoryFilter,
    handleSearch,
  };
};