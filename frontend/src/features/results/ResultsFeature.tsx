import { ExperienceCard, ExperienceCardSkeleton, Pagination, FilterButtons, ResultsGrid } from './components';

// Main results feature exports for lazy loading
export const ResultsFeature = {
  ExperienceCard,
  ExperienceCardSkeleton,
  Pagination,
  FilterButtons,
  ResultsGrid,
};

// Export feature-specific components for dynamic imports
export { 
  ExperienceCard, 
  ExperienceCardSkeleton, 
  Pagination, 
  FilterButtons, 
  ResultsGrid 
};
export * from './hooks';