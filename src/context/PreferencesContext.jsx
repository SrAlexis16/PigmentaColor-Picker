"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// 1. Crear el contexto principal
const PreferencesContext = createContext();

// Preferencias por defecto en caso de que no haya cookie
const DEFAULT_PREFERENCES = {
    language: 'es',
    enableColorHistory: true,
    enableContrastChecker: false,
};

// 2. Crear el Proveedor del Contexto
export function PreferencesProvider({ children }) {
    const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

    // Nuevo estado para el tema, con valor inicial del localStorage o 'light' por defecto.
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    // Cargar las preferencias de la cookie al inicio
    useEffect(() => {
        const savedPreferences = Cookies.get('userPreferences');
        if (savedPreferences) {
            try {
                const parsedPreferences = JSON.parse(savedPreferences);
                setPreferences(parsedPreferences);
            } catch (error) {
                console.error("Error al cargar preferencias desde cookies:", error);
            }
        }
    }, []);

    // Este useEffect maneja la lógica del tema. Se ejecuta cada vez que 'theme' cambia.
    useEffect(() => {
        // Aseguramos que el código solo se ejecute en el navegador
        if (typeof window !== 'undefined') {
            const root = window.document.documentElement;
            // Si el tema es 'dark', añade la clase 'dark' al <html>.
            if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
            // Guarda el tema en el localStorage para que persista
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const updatePreferences = (newPreferences) => {
        setPreferences(newPreferences);
        Cookies.set('userPreferences', JSON.stringify(newPreferences), { expires: 365 });
    };

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    return (
        <PreferencesContext.Provider value={{ preferences, updatePreferences, theme, setTheme, toggleTheme }}>
            {children}
        </PreferencesContext.Provider>
    );
}

export function usePreferences() {
    return useContext(PreferencesContext);
}