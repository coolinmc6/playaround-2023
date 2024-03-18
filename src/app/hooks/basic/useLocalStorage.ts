"use client"

import { useState, useEffect } from 'react';

const getLocalStorageItem = (key: string, initialValue: any) => {
  try {

    if (typeof window === 'undefined') return initialValue;
    console.log(!!window, !!window.localStorage)
    const savedValue = JSON.parse(window.localStorage.getItem(key) as string);
    if (savedValue) return savedValue;
  
    if (initialValue instanceof Function) return initialValue();
    return initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
}

const saveLocalStorageItem = (key: string, value: any) => {
  try {

    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
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

