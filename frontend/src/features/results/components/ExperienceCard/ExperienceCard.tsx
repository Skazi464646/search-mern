import React, { useMemo, useCallback } from 'react';
import type { Experience } from '@/types';
import styles from './ExperienceCard.module.css';

interface ExperienceCardProps {
  experience: Experience;
  onClick?: (experience: Experience) => void;
}

// Memoize the price formatter to avoid recreating on every render
const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onClick }) => {
  // Memoize the click handler to avoid recreating on every render
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(experience);
    }
  }, [onClick, experience]);

  // Memoize formatted price to avoid recalculating on every render
  const formattedPrice = useMemo(() => {
    if (!experience.price) return null;
    return priceFormatter.format(experience.price);
  }, [experience.price]);

  // Memoize badge classes to avoid recalculating on every render
  const badgeClasses = useMemo(() => {
    return `${styles.badge} ${experience.featured ? styles.featuredBadge : ''}`;
  }, [experience.featured]);

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img 
          src={experience.imageUrl} 
          alt={experience.title}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
        <div className={badgeClasses}>
          {experience.category}
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{experience.title}</h3>
        <p className={styles.description}>{experience.description}</p>
        
        <div className={styles.details}>
          <div>
            <div className={styles.destination}>{experience.destination}</div>
            {experience.duration && (
              <div className={styles.duration}>{experience.duration}</div>
            )}
          </div>
          
          <div className={styles.metadata}>
            {formattedPrice && (
              <div className={styles.price}>{formattedPrice}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize the skeleton component as it's static
export const ExperienceCardSkeleton: React.FC = React.memo(() => {
  return (
    <div className={styles.loadingCard}>
      <div className={styles.loadingImage}></div>
      <div className={styles.loadingContent}>
        <div className={styles.loadingTitle}></div>
        <div className={styles.loadingDescription}></div>
        <div className={styles.loadingDetails}>
          <div className={styles.loadingDestination}></div>
          <div className={styles.loadingPrice}></div>
        </div>
      </div>
    </div>
  );
});

ExperienceCardSkeleton.displayName = 'ExperienceCardSkeleton';

// Memoize the main component to prevent unnecessary re-renders
// Only re-render if experience or onClick props change
export default React.memo(ExperienceCard, (prevProps, nextProps) => {
  return (
    prevProps.experience.id === nextProps.experience.id &&
    prevProps.experience.title === nextProps.experience.title &&
    prevProps.experience.price === nextProps.experience.price &&
    prevProps.experience.featured === nextProps.experience.featured &&
    prevProps.onClick === nextProps.onClick
  );
});