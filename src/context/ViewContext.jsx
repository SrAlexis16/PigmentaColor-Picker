"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ViewContext = createContext();

export function ViewProvider({ children }) {
  const [activeView, setActiveView] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedView = localStorage.getItem("activeView");
      return storedView || null;
    }
    return null;
  });

  // Este useEffect se encargará de guardar el valor solo cuando cambie
  useEffect(() => {
    if (activeView !== null) {
      localStorage.setItem("activeView", activeView);
    } else {
      localStorage.removeItem("activeView");
    }
  }, [activeView]);

  return (
    <ViewContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </ViewContext.Provider>
  );
}

export const useView = () => useContext(ViewContext);