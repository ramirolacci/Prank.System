import React, { createContext, useContext } from 'react';

interface SettingsUIContextValue {
  openSettings: () => void;
}

const SettingsUIContext = createContext<SettingsUIContextValue>({
  openSettings: () => {},
});

export const SettingsUIProvider = SettingsUIContext.Provider;

export function useSettingsUI() {
  return useContext(SettingsUIContext);
}
