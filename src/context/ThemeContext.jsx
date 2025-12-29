import React, { createContext, useState, useEffect, useContext } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme || 'light';
  });

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('portfolio-theme', theme);

    // Apply theme to document body for smooth transitions
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.foreground;
  }, [theme, currentTheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme }}>
      <SCThemeProvider theme={currentTheme}>
        {children}
      </SCThemeProvider>
    </ThemeContext.Provider>
  );
};
