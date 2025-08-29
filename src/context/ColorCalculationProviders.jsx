"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { useMainColor } from './ColorContext';
import * as colorConversionUtils from '@/lib/color/conversions';
import * as colorAnalysisUtils from '@/lib/color/analysis';

const ColorCalculationsContext = createContext();

export const ColorCalculationsProvider = ({ children }) => {
  const mainColor = useMainColor();
  
  const colorValues = useMemo(() => {
    // Si no hay color, devolvemos un objeto vacío
    if (!mainColor) {
      return {};
    }
    
    // Calcula todos los valores de una vez
    return {
      hex: colorConversionUtils.toHex(mainColor),
      rgba: colorConversionUtils.toRgba(mainColor),
      hsl: colorConversionUtils.toHsl(mainColor),
      cmyk: colorConversionUtils.toCmyk(mainColor),
      cielab: colorConversionUtils.toCielab(mainColor),

      luminance: colorAnalysisUtils.getLuminance(mainColor),
      saturation: colorAnalysisUtils.getSaturation(mainColor),
      contrastWhite: colorAnalysisUtils.getContrastRatio(mainColor, '#ffffff'),
      contrastBlack: colorAnalysisUtils.getContrastRatio(mainColor, '#000000')
    };
  }, [mainColor]); // La dependencia es el mainColor

  return (
    <ColorCalculationsContext.Provider value={colorValues}>
      {children}
    </ColorCalculationsContext.Provider>
  );
};

// --- Hooks granulares para un mejor rendimiento ---

const useColorCalculationsContext = () => {
  const context = useContext(ColorCalculationsContext);
  if (!context) {
    throw new Error('Los hooks de cálculos de color deben usarse dentro de un ColorCalculationsProvider');
  }
  return context;
};

// Hooks para conversiones de color
export const useHexColor = () => {
  const { hex } = useColorCalculationsContext();
  return hex;
};

export const useRgbaColor = () => {
  const { rgba } = useColorCalculationsContext();
  return rgba;
};

export const useHslColor = () => {
  const { hsl } = useColorCalculationsContext();
  return hsl;
};

export const useCmykColor = () => {
  const { cmyk } = useColorCalculationsContext();
  return cmyk;
};

export const useCielabColor = () => {
  const { cielab } = useColorCalculationsContext();
  return cielab;
};

// Hooks para análisis de color
export const useLuminance = () => {
  const { luminance } = useColorCalculationsContext();
  return luminance;
};

export const useSaturation = () => {
  const { saturation } = useColorCalculationsContext();
  return saturation;
};

export const useContrastRatios = () => {
  const { contrastWhite, contrastBlack } = useColorCalculationsContext();
  return { contrastWhite, contrastBlack };
};