import chroma from 'chroma-js';

// Función para convertir un color a formato HEX.
export const toHex = (color) => {
    try {
        return chroma(color).hex();
    } catch (error) {
        console.error('Invalid color for Hex conversion:', color);
        return '';
    }
};

// Función para convertir un color a formato RGBA.
export const toRgba = (color) => {
    try {
        const [r, g, b, a] = chroma(color).rgba();
        return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(2)})`;
    } catch (error) {
        console.error('Invalid color for RGBA conversion:', color);
        return '';
    }
};

// Función para convertir un color a formato HSL (como string).
export const toHsl = (color) => {
    try {
        const [h, s, l] = chroma(color).hsl();
        return `hsl(${Math.round(h || 0)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    } catch (error) {
        console.error('Invalid color for HSL conversion:', color);
        return '';
    }
};

// Función para convertir un color a formato CMYK.
export const toCmyk = (color) => {
    try {
        const [c, m, y, k] = chroma(color).cmyk();
        return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
    } catch (error) {
        console.error('Invalid color for CMYK conversion:', color);
        return '';
    }
};

// Función para convertir un color a formato CIELAB.
export const toCielab = (color) => {
    try {
        const [L, a, b] = chroma(color).lab();
        return `lab(${Math.round(L)}, ${Math.round(a)}, ${Math.round(b)})`;
    } catch (error) {
        console.error('Invalid color for CIELAB conversion:', color);
        return '';
    }
};

// --- Funciones para manejo de HSL como objeto (CORREGIDAS) ---

/**
 * Convierte un color a un objeto con los componentes HSL + Alpha.
 * @param {string} color - El color de entrada (ej. '#3498db' o 'rgba(52, 152, 219, 0.8)').
 * @returns {{h: number, s: number, l: number, alpha: number}} - Un objeto HSL con alpha.
 */
export const hexToHsl = (color) => {
    try {
        const chromaColor = chroma(color);
        const [h, s, l] = chromaColor.hsl();
        const alpha = chromaColor.alpha();

        return {
            h: Math.round(h || 0),
            s: Math.round(s * 100),
            l: Math.round(l * 100),
            alpha: Math.round(alpha * 100), // Alpha como porcentaje (0-100)
        };
    } catch (error) {
        console.error('Error converting color to HSL:', color, error);
        return { h: 0, s: 0, l: 0, alpha: 100 };
    }
};

/**
 * Convierte un objeto HSL con alpha a un color CSS.
 * @param {{h: number, s: number, l: number, alpha?: number}} hsl - El objeto HSL.
 * @returns {string} - El color en formato CSS (hex si opaco, rgba si transparente).
 */
export const hslToHex = ({ h, s, l, alpha = 100 }) => {
    try {
        const alphaDecimal = alpha / 100;
        const color = chroma.hsl(h, s / 100, l / 100).alpha(alphaDecimal);

        // Si es completamente opaco, devolver HEX normal
        if (alpha >= 100) {
            return color.hex();
        } else {
            // Si tiene transparencia, devolver en formato rgba
            return color.css();
        }
    } catch (error) {
        console.error('Error converting HSL to color:', { h, s, l, alpha }, error);
        return '#000000';
    }
};

/**
 * Convierte un color a un objeto con los componentes RGB.
 * @param {string} color - El color de entrada (ej. '#3498db').
 * @returns {{r: number, g: number, b: number}} - Un objeto RGB.
 */
export const toRgb = (color) => {
    try {
        const [r, g, b] = chroma(color).rgb();
        return {
            r: Math.round(r),
            g: Math.round(g),
            b: Math.round(b),
        };
    } catch (error) {
        console.error('Error converting color to RGB:', color, error);
        return { r: 0, g: 0, b: 0 };
    }
};

/**
 * Aplica opacidad a un color hex existente.
 * @param {string} hexColor - Color en formato hex.
 * @param {number} alphaPercent - Opacidad en porcentaje (0-100).
 * @returns {string} - Color con opacidad aplicada.
 */
export const applyOpacity = (hexColor, alphaPercent) => {
    try {
        const color = chroma(hexColor).alpha(alphaPercent / 100);

        if (alphaPercent >= 100) {
            return color.hex();
        } else {
            return color.css();
        }
    } catch (error) {
        console.error('Error applying opacity:', hexColor, alphaPercent, error);
        return hexColor;
    }
};