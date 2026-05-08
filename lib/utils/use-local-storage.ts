"use client";

import { useState } from "react";

function readStorage<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") return initialValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readStorage(key, initialValue));

  const set = (next: T) => {
    setValue(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const clear = () => {
    setValue(initialValue);
    localStorage.removeItem(key);
  };

  // hydrated is always true now since we read on init
  return { value, set, clear, hydrated: true };
}
