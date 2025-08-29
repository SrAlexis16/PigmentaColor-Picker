"use client";

import React, { createContext, useState, useContext, useMemo, useEffect, useRef } from 'react';
import { useMainColor } from './ColorContext';
import * as colorUtils from '@/lib/color';

const PaletteContext = createContext();

export const PaletteProvider = ({ children }) => {
    const mainColor = useMainColor();
    const [palettes, setPalettes] = useState(null);
    const palettesCache = useRef(new Map());

    useEffect(() => {
        if (!mainColor) return;

        let newPalettes;
        if (palettesCache.current.has(mainColor)) {
            newPalettes = palettesCache.current.get(mainColor);
        } else {
            newPalettes = {
                analogous: colorUtils.generateAnalogous(mainColor),
                complementary: colorUtils.generateComplementary(mainColor),
                triadic: colorUtils.generateTriadic(mainColor),
                scale: colorUtils.generateScale(mainColor)
            };
            palettesCache.current.set(mainColor, newPalettes);
        }
        setPalettes(newPalettes);

    }, [mainColor]);

    const value = useMemo(() => ({ palettes }), [palettes]);

    return (
        <PaletteContext.Provider value={value}>
            {children}
        </PaletteContext.Provider>
    );
};

export const usePalettes = () => {
    const context = useContext(PaletteContext);
    if (!context) {
        throw new Error('usePalettes must be used within a PaletteProvider');
    }
    return context;
};