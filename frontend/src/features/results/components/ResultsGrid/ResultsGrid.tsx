import React from 'react';
import { useSearchStore } from '@/shared/store';
import { useResultsNavigation } from '../../hooks';
import { ExperienceCard, ExperienceCardSkeleton } from '../ExperienceCard';
import styles from './ResultsGrid.module.css';

interface ResultsGridProps {
  isLoading?: boolean;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ isLoading = false }) => {
  const { results } = useSearchStore();
  const { handleExperienceClick } = useResultsNavigation();

  const renderSkeletons = () => {
    return Array.from({ length: 8 }, (_, index) => (
      <ExperienceCardSkeleton key={index} />
    ));
  };

  if (isLoading) {
    return (
      <div className={styles.loadingGrid}>
        {renderSkeletons()}
      </div>
    );
  }

  if (results.length === 0) {
    return null; // Let parent handle empty state
  }

  return (
    <div className={styles.grid}>
      {results.map((experience) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          onClick={handleExperienceClick}
        />
      ))}
    </div>
  );
};

export default React.memo(ResultsGrid);