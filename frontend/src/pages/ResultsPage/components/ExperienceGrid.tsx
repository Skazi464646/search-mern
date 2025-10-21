import React from 'react';
import { ExperienceCard } from '@/features/results';
import type { Experience } from '@/types';
import styles from '../ResultsPage.module.css';

interface ExperienceGridProps {
  experiences: Experience[];
  onExperienceClick: (experience: Experience) => void;
}

export const ExperienceGrid: React.FC<ExperienceGridProps> = React.memo(({
  experiences,
  onExperienceClick,
}) => {
  return (
    <div className={styles.grid}>
      {experiences.map((experience) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          onClick={onExperienceClick}
        />
      ))}
    </div>
  );
});

ExperienceGrid.displayName = 'ExperienceGrid';