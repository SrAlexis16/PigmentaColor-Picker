import chroma from 'chroma-js';

// Genera una paleta de colores de un degradado (escala).
// Es perfecto para la vista de artista o para crear degradados en la UI.
export const generateScale = (startColor, endColor = null, numColors = 5) => {
  try {
    // Si no se da un color final, se crea un degradado con el mismo color.
    const finalColor = endColor || chroma(startColor).darken(2).hex();
    return chroma.scale([startColor, finalColor]).colors(numColors);
  } catch (error) {
    console.error('Invalid colors for scale generation:', startColor, endColor);
    return [];
  }
};

// Genera una paleta de colores complementarios.
// Útil para crear contrastes fuertes y elementos que llamen la atención.
// Retorna la paleta de 2 colores: el base y su opuesto.
export const generateComplementary = (baseColor) => {
  try {
    const base = chroma(baseColor);
    const complementary = base.set('hsl.h', '+180');
    return [base.hex(), complementary.hex()];
  } catch (error) {
    console.error('Invalid color for complementary palette:', baseColor);
    return [];
  }
};

// Genera una paleta de colores análogos.
// Crean una sensación de armonía y calma.
// Retorna 3 colores: el base y sus dos vecinos en la rueda de color.
export const generateAnalogous = (baseColor) => {
  try {
    const base = chroma(baseColor);
    const analogous1 = base.set('hsl.h', '+30');
    const analogous2 = base.set('hsl.h', '-30');
    return [base.hex(), analogous1.hex(), analogous2.hex()];
  } catch (error) {
    console.error('Invalid color for analogous palette:', baseColor);
    return [];
  }
};

// Genera una paleta de colores triádicos.
// Son vibrantes y muy equilibrados.
// Retorna 3 colores: el base y otros dos espaciados 120° en la rueda.
export const generateTriadic = (baseColor) => {
  try {
    const base = chroma(baseColor);
    const triadic1 = base.set('hsl.h', '+120');
    const triadic2 = base.set('hsl.h', '+240');
    return [base.hex(), triadic1.hex(), triadic2.hex()];
  } catch (error) {
    console.error('Invalid color for triadic palette:', baseColor);
    return [];
  }
};