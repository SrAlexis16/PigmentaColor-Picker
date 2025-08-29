"use client";

import React, { createContext, useState, useContext, useMemo, useCallback, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import * as colorUtils from '@/lib/color';

const ColorStateContext = createContext();
const ColorActionsContext = createContext();

export const ColorProvider = ({ children }) => {
    // Estados principales
    const [mainColor, setMainColorState] = useState('#3498db');
    
    // Estado temporal para mostrar cambios inmediatos sin triggear recálculos costosos
    const [previewColor, setPreviewColor] = useState('#3498db');
    const [isUpdating, setIsUpdating] = useState(false);

    // Refs para debounce cleanup
    const debouncedSetMainColorRef = useRef();
    
    // Función optimizada con debounce para actualizar color principal
    const setMainColor = useCallback((newColor, options = {}) => {
        const { immediate = false, debounceMs = 300 } = options;

        if (!colorUtils.isValidColor(newColor)) {
            console.warn('Invalid color provided:', newColor);
            return;
        }

        // Actualización inmediata del preview para feedback visual
        setPreviewColor(newColor);

        if (immediate || newColor === mainColor) {
            if (newColor !== mainColor) {
                setMainColorState(newColor);
                setIsUpdating(false);
            }
            return;
        }

        setIsUpdating(true);

        // Cancelar debounce anterior si existe
        if (debouncedSetMainColorRef.current) {
            debouncedSetMainColorRef.current.cancel();
        }

        // Crear nueva función debounced
        debouncedSetMainColorRef.current = debounce((color) => {
            setMainColorState(color);
            setIsUpdating(false);
        }, debounceMs);

        // Ejecutar debounced
        debouncedSetMainColorRef.current(newColor);
    }, [mainColor]);

    // Función para cancelar todas las actualizaciones pendientes
    const cancelPendingUpdates = useCallback(() => {
        if (debouncedSetMainColorRef.current) {
            debouncedSetMainColorRef.current.cancel();
        }
        setIsUpdating(false);
        setPreviewColor(mainColor);
    }, [mainColor]);

    // Función para forzar actualización inmediata
    const flushUpdates = useCallback(() => {
        if (debouncedSetMainColorRef.current) {
            debouncedSetMainColorRef.current.flush();
        }
    }, []);

    // Cleanup al desmontar
    useEffect(() => {
        return () => {
            if (debouncedSetMainColorRef.current) {
                debouncedSetMainColorRef.current.cancel();
            }
        };
    }, []);

    // Sincronizar previewColor con mainColor cuando no hay actualizaciones pendientes
    useEffect(() => {
        if (!isUpdating) {
            setPreviewColor(mainColor);
        }
    }, [mainColor, isUpdating]);

    // Estado con preview para feedback inmediato
    const stateValue = useMemo(() => ({
        mainColor,
        previewColor,
        isUpdating,
    }), [mainColor, previewColor, isUpdating]);

    // Acciones optimizadas
    const actionsValue = useMemo(() => ({
        setMainColor,
        cancelPendingUpdates,
        flushUpdates,
    }), [setMainColor, cancelPendingUpdates, flushUpdates]);

    return (
        <ColorStateContext.Provider value={stateValue}>
            <ColorActionsContext.Provider value={actionsValue}>
                {children}
            </ColorActionsContext.Provider>
        </ColorStateContext.Provider>
    );
};

// Hooks base
export const useColorState = () => {
    const context = useContext(ColorStateContext);
    if (!context) {
        throw new Error('useColorState must be used within a ColorProvider');
    }
    return context;
};

export const useColorActions = () => {
    const context = useContext(ColorActionsContext);
    if (!context) {
        throw new Error('useColorActions must be used within a ColorProvider');
    }
    return context;
};

// Hooks granulares optimizados
export const useMainColor = () => {
    const { mainColor } = useColorState();
    return mainColor;
};

export const usePreviewColor = () => {
    const { previewColor } = useColorState();
    return previewColor;
};

export const useVisualColor = () => {
    const { mainColor, previewColor, isUpdating } = useColorState();
    return isUpdating ? previewColor : mainColor;
};

export const useIsColorUpdating = () => {
    const { isUpdating } = useColorState();
    return isUpdating;
};

export const useSetMainColor = () => {
    const { setMainColor } = useColorActions();
    return setMainColor;
};

export const useColorPicker = () => {
    const { setMainColor, cancelPendingUpdates, flushUpdates } = useColorActions();
    const { previewColor, isUpdating } = useColorState();

    return useMemo(() => ({
        currentColor: previewColor,
        isUpdating,
        onChange: (color) => setMainColor(color, { debounceMs: 200 }),
        onChangeComplete: (color) => setMainColor(color, { immediate: true }),
        onCancel: cancelPendingUpdates,
        onApply: flushUpdates,
    }), [setMainColor, cancelPendingUpdates, flushUpdates, previewColor, isUpdating]);
};