import { useState, useEffect } from 'react';

function getStorageValue(key, defaultValue) {
  // Verificamos si estamos en el cliente para acceder a localStorage
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved ? JSON.parse(saved) : defaultValue;
    return initial;
  }
  return defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // Almacenamos el valor en localStorage cada vez que cambie
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};