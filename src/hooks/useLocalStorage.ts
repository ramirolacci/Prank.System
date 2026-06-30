import { useState, useEffect, useCallback } from 'react';
import { PrankConfig } from '../types/prank';
import { readStorage, writeStorage, removeStorage } from './useStorage';

export interface HistoryItem {
  id: string;
  name: string;
  config: PrankConfig;
  createdAt: string;
  updatedAt?: string;
}

const HISTORY_KEY = 'prankforge_history_v1';
const DRAFT_KEY = 'prankforge_draft_v1';
const LAST_PRANK_KEY = 'prankforge_last_prank_v1';

function formatDate(): string {
  return new Date().toLocaleDateString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  });
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

export function useLocalStorage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [draft, setDraft] = useState<PrankConfig | null>(null);
  const [lastPrank, setLastPrank] = useState<PrankConfig | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHistory(readStorage<HistoryItem[]>(HISTORY_KEY, []));
    setDraft(readStorage<PrankConfig | null>(DRAFT_KEY, null));
    setLastPrank(readStorage<PrankConfig | null>(LAST_PRANK_KEY, null));
    setHydrated(true);
  }, []);

  const persistHistory = useCallback((items: HistoryItem[]) => {
    setHistory(items);
    writeStorage(HISTORY_KEY, items);
  }, []);

  const saveToHistory = useCallback(
    (customName: string, config: PrankConfig) => {
      try {
        const name = customName.trim() || `${config.prankType} - ${config.theme}`;
        const newItem: HistoryItem = {
          id: generateId(),
          name,
          config,
          createdAt: formatDate(),
          updatedAt: formatDate(),
        };
        const updated = [newItem, ...history.slice(0, 19)];
        persistHistory(updated);
        writeStorage(LAST_PRANK_KEY, config);
        setLastPrank(config);
        return newItem;
      } catch (e) {
        console.error('Error saving history:', e);
        return null;
      }
    },
    [history, persistHistory]
  );

  const updateHistoryItem = useCallback(
    (id: string, updates: { name?: string; config?: PrankConfig }) => {
      const updated = history.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
              name: updates.name ?? item.name,
              config: updates.config ?? item.config,
              updatedAt: formatDate(),
            }
          : item
      );
      persistHistory(updated);
      const item = updated.find((h) => h.id === id);
      if (item) {
        writeStorage(LAST_PRANK_KEY, item.config);
        setLastPrank(item.config);
      }
      return item ?? null;
    },
    [history, persistHistory]
  );

  const duplicateFromHistory = useCallback(
    (id: string) => {
      const item = history.find((h) => h.id === id);
      if (!item) return null;
      return saveToHistory(`${item.name} (copia)`, { ...item.config });
    },
    [history, saveToHistory]
  );

  const deleteFromHistory = useCallback(
    (id: string) => {
      persistHistory(history.filter((item) => item.id !== id));
    },
    [history, persistHistory]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    removeStorage(HISTORY_KEY);
  }, []);

  const saveDraft = useCallback((config: PrankConfig) => {
    setDraft(config);
    writeStorage(DRAFT_KEY, config);
    writeStorage(LAST_PRANK_KEY, config);
    setLastPrank(config);
  }, []);

  const clearDraft = useCallback(() => {
    setDraft(null);
    removeStorage(DRAFT_KEY);
  }, []);

  return {
    history,
    draft,
    lastPrank,
    hydrated,
    saveToHistory,
    updateHistoryItem,
    duplicateFromHistory,
    deleteFromHistory,
    clearHistory,
    saveDraft,
    clearDraft,
  };
}
