import React from 'react';
import type { Experience } from '../../types';
import styles from './ExperienceCard.module.css';

interface ExperienceCardProps {
  experience: Experience;
  onClick?: (experience: Experience) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(experience);
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img 
          src={experience.imageUrl} 
          alt={experience.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={`${styles.badge} ${experience.featured ? styles.featuredBadge : ''}`}>
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
            {experience.price && (
              <div className={styles.price}>{formatPrice(experience.price)}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExperienceCardSkeleton: React.FC = () => {
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
};

export default ExperienceCard;