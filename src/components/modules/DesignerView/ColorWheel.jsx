"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import Wheel from "@uiw/react-color-wheel";
import { throttle } from "lodash";
import { 
  useVisualColor, 
  useSetMainColor, 
  useIsColorUpdating 
} from "@/context/ColorContext";
import * as colorUtils from "@/lib/color";

export const ColorWheel = React.memo(() => {
  const visualColor = useVisualColor();
  const setMainColor = useSetMainColor()
  const isUpdating = useIsColorUpdating();
  
  const currentHsl = useMemo(() => {
    if (!visualColor) return { h: 0, s: 50, l: 50, alpha: 100 };
    return colorUtils.hexToHsl(visualColor);
  }, [visualColor]);

  const handleWheelChange = useCallback((colorData) => {
    if (!colorData?.hex) return;
    
    try {
      const newColorHsl = colorUtils.hexToHsl(colorData.hex);
      
      const updatedHsl = {
        h: newColorHsl.h,
        s: currentHsl.s,
        l: currentHsl.l,
        alpha: currentHsl.alpha
      };

      // Convertir de vuelta a color y actualizar con preview inmediato
      const newColor = colorUtils.hslToHex(updatedHsl);
      
      // Usar debounce automático del contexto para performance
      setMainColor(newColor, { debounceMs: 50 });
      
    } catch (error) {
      console.error('Error updating color from wheel:', error);
    }
  }, [currentHsl, setMainColor]);

  // Throttle optimizado para el wheel (evita demasiadas actualizaciones)
  const throttledWheelChange = useMemo(
    () => throttle(handleWheelChange, 16), // ~60fps
    [handleWheelChange]
  );

  // Cleanup del throttle
  useEffect(() => {
    return () => {
      if (throttledWheelChange.cancel) {
        throttledWheelChange.cancel();
      }
    };
  }, [throttledWheelChange]);

  // Color para mostrar en el wheel (formato que entiende el componente)
  const wheelColor = useMemo(() => {
    if (!visualColor) return '#3498db';
    
    try {
      const wheelHsl = {
        h: currentHsl.h,
        s: 100,
        l: 50, 
        alpha: 100
      };
      
      return colorUtils.hslToHex(wheelHsl);
    } catch (error) {
      console.error('Error preparing wheel color:', error);
      return visualColor;
    }
  }, [visualColor, currentHsl.h]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {isUpdating && (
        <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse z-10 pointer-events-none" />
      )}
      
      <div className="relative w-full h-full flex items-center justify-center">
        <Wheel
          color={wheelColor}
          onChange={throttledWheelChange}
          className="w-full h-full"
        />
      </div>
    </div>
  );
});

ColorWheel.displayName = 'ColorWheel';