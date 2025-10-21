import React from 'react';
import { ExperienceCardSkeleton } from '@/features/results';
import styles from '../ResultsPage.module.css';

interface LoadingGridProps {
  skeletonElements: readonly number[];
}

export const LoadingGrid: React.FC<LoadingGridProps> = React.memo(({
  skeletonElements,
}) => {
  return (
    <div className={styles.loadingGrid}>
      {skeletonElements.map((index) => (
        <ExperienceCardSkeleton key={index} />
      ))}
    </div>
  );
});

LoadingGrid.displayName = 'LoadingGrid';