import React from 'react';
import { LoadingSpinner } from '@/components/ui';
import styles from './PageLoader.module.css';

const PageLoader: React.FC = () => {
  return (
    <div className={styles.pageLoader}>
      <div className={styles.content}>
        <LoadingSpinner size="large" text="Loading page..." />
      </div>
    </div>
  );
};

export default PageLoader;