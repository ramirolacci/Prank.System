import { useState, useEffect, useCallback } from 'react';

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function readStorage<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): boolean {
  if (!isBrowser()) return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`[useStorage] Error writing key "${key}":`, e);
    return false;
  }
}

export function removeStorage(key: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`[useStorage] Error removing key "${key}":`, e);
  }
}

/**
 * Generic SSR-safe localStorage hook with JSON serialization.
 */
export function useStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => readStorage(key, defaultValue));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(readStorage(key, defaultValue));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  const reset = useCallback(() => {
    removeStorage(key);
    setValue(defaultValue);
  }, [key, defaultValue]);

  return { value, setValue: update, reset, hydrated };
}
