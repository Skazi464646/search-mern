import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '@/stores';
import type { Experience } from '@/types';

export const useResultsNavigation = () => {
  const navigate = useNavigate();
  const { results, query, isLoading } = useSearchStore();

  // Redirect to search page if no search has been performed
  useEffect(() => {
    if (!query && results.length === 0 && !isLoading) {
      navigate('/');
    }
  }, [query, results.length, isLoading, navigate]);

  const handleExperienceClick = useCallback((experience: Experience) => {
    console.log('Experience clicked:', experience);
    // navigate(`/experience/${experience.id}`);
  }, []);

  const handleBackToSearch = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return {
    handleExperienceClick,
    handleBackToSearch,
  };
};