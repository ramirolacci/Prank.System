import React, { createContext, useContext } from 'react';
import { useLocalStorage, HistoryItem } from '../hooks/useLocalStorage';
import { PrankConfig } from '../types/prank';

export type { HistoryItem };

interface LocalStorageContextValue {
  history: HistoryItem[];
  draft: PrankConfig | null;
  lastPrank: PrankConfig | null;
  hydrated: boolean;
  saveToHistory: (customName: string, config: PrankConfig) => HistoryItem | null;
  updateHistoryItem: (
    id: string,
    updates: { name?: string; config?: PrankConfig }
  ) => HistoryItem | null;
  duplicateFromHistory: (id: string) => HistoryItem | null;
  deleteFromHistory: (id: string) => void;
  clearHistory: () => void;
  saveDraft: (config: PrankConfig) => void;
  clearDraft: () => void;
}

const LocalStorageContext = createContext<LocalStorageContextValue | null>(null);

export const LocalStorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storage = useLocalStorage();
  return (
    <LocalStorageContext.Provider value={storage}>{children}</LocalStorageContext.Provider>
  );
};

export function usePrankStorage() {
  const ctx = useContext(LocalStorageContext);
  if (!ctx) {
    throw new Error('usePrankStorage must be used within LocalStorageProvider');
  }
  return ctx;
}
