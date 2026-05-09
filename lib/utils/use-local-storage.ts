"use client";

import { useState } from "react";

function readFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() =>
    readFromStorage(key, initialValue)
  );

  const set = (next: T) => {
    setValue(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const clear = () => {
    setValue(initialValue);
    localStorage.removeItem(key);
  };

  return { value, set, clear, hydrated: true };
}
