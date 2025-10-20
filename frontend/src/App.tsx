import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import PageLoader from './components/common/PageLoader';
import LazyLoadError from './components/common/LazyLoadError';
import './App.css';

// Lazy load pages for better performance and code splitting
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const ResultsPage = React.lazy(() => import('./pages/ResultsPage'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <ErrorBoundary fallback={LazyLoadError}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/results" element={<ResultsPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
