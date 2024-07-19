import { useContext } from 'react';
import { ThemeContextProps } from '@types';
import { ThemeContext } from '../context/ThemeContext.tsx';

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
