import { useState, useEffect } from 'react';
import { PrankConfig } from '../types/prank';

export interface HistoryItem {
  id: string;
  name: string;
  config: PrankConfig;
  createdAt: string;
}

const HISTORY_KEY = 'prankforge_history_v1';
const DRAFT_KEY = 'prankforge_draft_v1';

export function useLocalStorage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [draft, setDraft] = useState<PrankConfig | null>(null);

  // Load initial data on mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
      
      const storedDraft = localStorage.getItem(DRAFT_KEY);
      if (storedDraft) {
        setDraft(JSON.parse(storedDraft));
      }
    } catch (e) {
      console.error('Error reading from localStorage:', e);
    }
  }, []);

  // Save a new configuration to history
  const saveToHistory = (customName: string, config: PrankConfig) => {
    try {
      const name = customName.trim() || `${config.prankType} - ${config.theme}`;
      const newItem: HistoryItem = {
        id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
        name,
        config,
        createdAt: new Date().toLocaleDateString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit'
        }),
      };
      
      const updatedHistory = [newItem, ...history.slice(0, 19)]; // Store up to last 20 pranks
      setHistory(updatedHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
      return newItem;
    } catch (e) {
      console.error('Error saving history to localStorage:', e);
      return null;
    }
  };

  // Duplicate an existing history item
  const duplicateFromHistory = (id: string) => {
    const item = history.find((h) => h.id === id);
    if (!item) return null;
    return saveToHistory(`${item.name} (copia)`, { ...item.config });
  };

  // Delete a specific history item
  const deleteFromHistory = (id: string) => {
    try {
      const updatedHistory = history.filter(item => item.id !== id);
      setHistory(updatedHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Error deleting history item:', e);
    }
  };

  // Clear all history logs
  const clearHistory = () => {
    try {
      setHistory([]);
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.error('Error clearing history:', e);
    }
  };

  // Save draft state
  const saveDraft = (config: PrankConfig) => {
    try {
      setDraft(config);
      localStorage.setItem(DRAFT_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Error saving draft:', e);
    }
  };

  // Reset/Clear active draft
  const clearDraft = () => {
    try {
      setDraft(null);
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {
      console.error('Error clearing draft:', e);
    }
  };

  return {
    history,
    draft,
    saveToHistory,
    duplicateFromHistory,
    deleteFromHistory,
    clearHistory,
    saveDraft,
    clearDraft,
  };
}
