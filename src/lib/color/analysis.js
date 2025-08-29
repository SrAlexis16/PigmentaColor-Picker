import chroma from 'chroma-js';

/**
 * Calcula la relación de contraste entre dos colores.
 * Una relación de 4.5:1 es el mínimo recomendado por WCAG para accesibilidad.
 * @param {string} color1 - El primer color (en cualquier formato válido para chroma).
 * @param {string} color2 - El segundo color.
 * @returns {string} La relación de contraste con 2 decimales, o 'N/A' si hay un error.
 */
export const getContrastRatio = (color1, color2) => {
    try {
        return chroma.contrast(color1, color2).toFixed(2);
    } catch (error) {
        console.error('Invalid colors for contrast ratio calculation:', color1, color2);
        return 'N/A';
    }
};

/**
 * Determina si un color es "claro" o "oscuro" basándose en su luminancia.
 * Útil para decidir el color de texto o íconos que se superponen.
 * @param {string} color - El color a evaluar.
 * @returns {boolean} True si el color es claro, False si es oscuro.
 */
export const isLight = (color) => {
    try {
        return chroma(color).luminance() > 0.5;
    } catch (error) {
        console.error('Invalid color for luminance check:', color);
        return false;
    }
};

/**
 * Valida si un string es un color válido para chroma-js, 
 * con validación adicional para formatos comunes como HEX, RGBA y HSL.
 *
 * @param {string} color - El string de color a validar.
 * @returns {boolean} True si el color es válido, False en caso contrario.
 */
export const isValidColor = (color) => {
    // 1. Validar con chroma-js (método base y más flexible)
    try {
        if (chroma.valid(color)) {
            return true;
        }
    } catch (error) {
        // Si chroma.valid() falla, intentamos con las regex
    }

    // 2. Validaciones adicionales con expresiones regulares (regex)
    // para mayor precisión en formatos comunes.

    // Regex para formato HEX de 3 o 6 dígitos
    const hexRegex = /^#?([0-9a-fA-F]{3}){1,2}$/;
    if (hexRegex.test(color)) {
        return true;
    }

    // Regex para formato RGBA
    const rgbaRegex = /^rgba\((\s*\d{1,3}\s*,){3}\s*(0?\.\d+|\d{1})\s*\)$/;
    if (rgbaRegex.test(color)) {
        // Para RGBA, también validamos que los valores RGB estén dentro del rango 0-255.
        const parts = color.match(/\d+/g);
        if (parts && parts.length === 4) {
            const [r, g, b] = parts.slice(0, 3).map(Number);
            if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
                return true;
            }
        }
    }

    // Regex para formato HSL
    const hslRegex = /^hsl\((\s*\d{1,3}\s*,){2}\s*\d{1,3}%\s*\)$/;
    if (hslRegex.test(color)) {
        // Para HSL, también validamos que los valores H, S, L estén en su rango
        const parts = color.match(/\d+/g);
        if (parts && parts.length === 3) {
            const [h, s, l] = parts.map(Number);
            if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
                return true;
            }
        }
    }

    // Si ninguna de las validaciones anteriores pasa, el color no es válido.
    return false;
};

/**
 * Obtiene el valor de luminancia de un color (de 0 a 1).
 * Más granular que isLight.
 * @param {string} color - El color a evaluar.
 * @returns {string} La luminancia con 2 decimales, o 'N/A' si hay un error.
 */
export const getLuminance = (color) => {
    try {
        return chroma(color).luminance().toFixed(2);
    } catch (error) {
        console.error('Invalid color for luminance:', color);
        return 'N/A';
    }
};

/**
 * Obtiene la saturación de un color (de 0 a 1).
 * Útil para saber qué tan "vibrante" es un color.
 * @param {string} color - El color a evaluar.
 * @returns {string} La saturación con 2 decimales, o 'N/A' si hay un error.
 */
export const getSaturation = (color) => {
    try {
        const [h, s, l] = chroma(color).hsl();
        return s ? s.toFixed(2) : '0.00';
    } catch (error) {
        console.error('Invalid color for saturation:', color);
        return 'N/A';
    }
};

/**
 * Mide la diferencia perceptual entre dos colores (Delta E).
 * Un Delta E < 1 es imperceptible, mientras que un Delta E > 5 es una diferencia notable.
 * @param {string} color1 - El primer color.
 * @param {string} color2 - El segundo color.
 * @returns {string} El valor Delta E con 2 decimales, o 'N/A' si hay un error.
 */
export const getDeltaE = (color1, color2) => {
    try {
        return chroma.deltaE(color1, color2).toFixed(2);
    } catch (error) {
        console.error('Invalid colors for Delta E calculation:', color1, color2);
        return 'N/A';
    }
};

/**
 * Mezcla dos colores dándole una prioridad al primero.
 * @param {string} color1 - El primer color (ej. '#34b086').
 * @param {string} color2 - El segundo color (ej. '#b03f34').
 * @param {number} priority1 - La prioridad del primer color, de 0 a 1.
 * @returns {string} El color resultante en formato Hex.
 */
export const mixColors = (color1, color2, priority1) => {
    try {
        // La función chroma.mix toma el 'amount' del SEGUNDO color.
        // Si queremos darle prioridad al primer color, el 'amount' del
        // segundo color será 1 - priority1.
        const mixAmount = 1 - priority1;
        return chroma.mix(color1, color2, mixAmount).hex();
    } catch (error) {
        console.error('Error mixing colors:', color1, color2, error);
        return '#000000'; // Retorna un color por defecto en caso de error
    }
};