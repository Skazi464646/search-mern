import React from 'react';
import { Button } from '../Button';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {icon && (
        <div className={styles.icon}>
          {icon}
        </div>
      )}
      
      <h2 className={styles.title}>{title}</h2>
      
      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
      
      {action && (
        <div className={styles.action}>
          <Button
            variant={action.variant || 'primary'}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(EmptyState);