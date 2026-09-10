'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useFeatureIsOn } from '@growthbook/growthbook-react';
import { analytics } from "@/lib/analytics";
import { getAnonymousId } from "@/lib/anonymous-id";

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const anonymousId = getAnonymousId();

export function ThemeProvider({ children }: { children: React.ReactNode }) {
// GrowthBook feature flag:
// true = light
// false = dark
  const isLightTheme = useFeatureIsOn('toggle-theme');
  console.log('this is:', isLightTheme);
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const isInitialTheme = useRef(true);
  const getTheme = isLightTheme ? 'light' : 'dark';

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('dex_theme') as Theme | null;
      setThemeState(getTheme);
  }, [isLightTheme]);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('dex_theme', theme);
    isInitialTheme.current = false;
  }, [theme, mounted]);

   // Analytics
   useEffect(() => {
    if (!mounted || isInitialTheme.current ) {
      return;
    }

    analytics.track('theme_changed', {
      anonymousId: anonymousId,
      theme: getTheme,
    });

    console.log('Theme Changed:', {
      theme,
    });
  }, [theme, mounted, isLightTheme]);


  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
