import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { AppTheme } from '../types/prank';
import { UserSettings, DEFAULT_USER_SETTINGS } from '../types/settings';
import { useStorage } from '../hooks/useStorage';
import { applyThemeTokens } from '../theme/themeConfig';

const SETTINGS_KEY = 'prankforge_settings_v1';

interface ThemeContextValue {
  settings: UserSettings;
  theme: AppTheme;
  hydrated: boolean;
  setTheme: (theme: AppTheme) => void;
  setAccentColor: (color: string) => void;
  markGuideSeen: () => void;
  updateSettings: (patch: Partial<UserSettings>) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { value: settings, setValue: setSettings, hydrated } = useStorage<UserSettings>(
    SETTINGS_KEY,
    DEFAULT_USER_SETTINGS
  );

  useEffect(() => {
    if (hydrated) {
      applyThemeTokens(settings.appTheme, settings.accentColor);
    }
  }, [settings.appTheme, settings.accentColor, hydrated]);

  const setTheme = useCallback(
    (theme: AppTheme) => {
      setSettings((prev) => ({ ...prev, appTheme: theme }));
    },
    [setSettings]
  );

  const setAccentColor = useCallback(
    (color: string) => {
      setSettings((prev) => ({ ...prev, accentColor: color }));
    },
    [setSettings]
  );

  const markGuideSeen = useCallback(() => {
    setSettings((prev) => ({ ...prev, hasSeenGuide: true }));
  }, [setSettings]);

  const updateSettings = useCallback(
    (patch: Partial<UserSettings>) => {
      setSettings((prev) => ({ ...prev, ...patch }));
    },
    [setSettings]
  );

  return (
    <ThemeContext.Provider
      value={{
        settings,
        theme: settings.appTheme,
        hydrated,
        setTheme,
        setAccentColor,
        markGuideSeen,
        updateSettings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
