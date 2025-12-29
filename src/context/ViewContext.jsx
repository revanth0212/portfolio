import React, { createContext, useState, useEffect, useContext } from 'react';

const ViewContext = createContext();

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
};

export const ViewProvider = ({ children }) => {
  const [view, setView] = useState(() => {
    // Load view preference from localStorage
    const savedView = localStorage.getItem('portfolio-view');
    return savedView || 'terminal';
  });

  useEffect(() => {
    // Save view preference to localStorage
    localStorage.setItem('portfolio-view', view);
  }, [view]);

  const toggleView = () => {
    setView(prevView => prevView === 'terminal' ? 'classic' : 'terminal');
  };

  return (
    <ViewContext.Provider value={{ view, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
};
