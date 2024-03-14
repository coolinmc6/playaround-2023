"use client"

import { useState, useEffect } from 'react';

const getLocalStorageItem = (key: string, initialValue: any) => {
  const savedValue = JSON.parse(localStorage.getItem(key) as string);
  if (savedValue) return savedValue;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

const saveLocalStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    return getLocalStorageItem(key, initialValue);
  });

  useEffect(() => {
    saveLocalStorageItem(key, value);
  }, [value, key])

  return [value, setValue] as const;
}

