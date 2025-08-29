import { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import namer from 'color-namer';
import chroma from 'chroma-js';
import { useTranslation } from 'react-i18next';

export const useColorName = (color, debounceTime = 500) => {
  const { t } = useTranslation(); 
  const [colorName, setColorName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Función para convertir cualquier formato de color a hex
  const convertToHex = (inputColor) => {
    try {
      if (!inputColor) return null;
      
      // Si ya es hex, lo devolvemos tal como está
      if (typeof inputColor === 'string' && inputColor.startsWith('#')) {
        return inputColor;
      }
      
      // Para cualquier otro formato (rgba, hsla, nombres de colores, etc.)
      // usamos chroma-js para convertir a hex
      const chromaColor = chroma(inputColor);
      return chromaColor.hex();
    } catch (error) {
      console.warn('Error converting color to hex:', error);
      return null;
    }
  };

  // Usamos useMemo para crear una función debounced que no cambie en cada render
  const debouncedNamer = useMemo(
    () => debounce((inputColor) => {
      const hexColor = convertToHex(inputColor);
      
      if (!hexColor) {
        setColorName('');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const names = namer(hexColor, { pick: ['ntc'] });
        setColorName(names.ntc[0].name);
      } catch (e) {
        console.warn('Error getting color name:', e);
        setColorName(t("context.unknownColor"));
      } finally {
        setIsLoading(false);
      }
    }, debounceTime),
    [debounceTime]
  );

  useEffect(() => {
    // Al cambiar el color, cancelamos cualquier llamada anterior
    debouncedNamer.cancel();
    // Y disparamos la nueva
    debouncedNamer(color);
  }, [color, debouncedNamer]);

  useEffect(() => {
    return () => debouncedNamer.cancel();
  }, [debouncedNamer]);

  return { colorName, isLoading };
};