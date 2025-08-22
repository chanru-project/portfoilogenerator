import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ThemeType, Theme } from '../types';
import { themes } from '../data/themes';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: ThemeType) => void;
  allThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  const setTheme = (themeId: ThemeType) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('portfolio-theme', themeId);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeType;
    if (savedTheme) {
      const theme = themes.find(t => t.id === savedTheme);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
  }, []);

  useEffect(() => {
    // Apply CSS custom properties for the current theme
    const root = document.documentElement;
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, allThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  );
};