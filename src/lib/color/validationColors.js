import { isValidColor } from './analysis';

/**
 * Normaliza colores HEX de diferentes longitudes a formato estándar
 * @param {string} hex - Color HEX a normalizar
 * @returns {string} Color HEX normalizado
 */
export const normalizeHexColor = (hex) => {
  if (!hex || !hex.startsWith('#')) return hex;
  
  const hexValue = hex.slice(1);
  
  // Casos según la longitud del HEX
  switch (hexValue.length) {
    case 3: // #RGB -> #RRGGBB
      return '#' + hexValue.split('').map(char => char + char).join('');
    
    case 4: // #RGBA -> #RRGGBB (eliminamos alpha para compatibilidad)
      const [r, g, b, a] = hexValue.split('');
      return '#' + r + r + g + g + b + b;
    
    case 6: // #RRGGBB (ya está normalizado)
      return hex;
    
    case 8: // #RRGGBBAA -> #RRGGBB (eliminamos alpha)
      return hex.slice(0, 7);
    
    default:
      return hex; // Retornamos tal como está si no coincide
  }
};

/**
 * Valida si un string es un color HEX válido
 * @param {string} hex - String a validar
 * @returns {boolean} true si es un HEX válido
 */
export const isValidHexColor = (hex) => {
  if (!hex || typeof hex !== 'string') return false;
  
  // Debe empezar con #
  if (!hex.startsWith('#')) return false;
  
  const hexValue = hex.slice(1);
  
  // Longitudes válidas: 3, 4, 6, 8
  if (![3, 4, 6, 8].includes(hexValue.length)) return false;
  
  // Todos los caracteres deben ser hexadecimales
  return /^[0-9A-Fa-f]+$/.test(hexValue);
};

/**
 * Mensajes de error por formato de color
 */
export const COLOR_FORMAT_MESSAGES = {
  hex: 'Formato HEX inválido. Ej: #FF0000, #F00, #FF0000AA, #F00A',
  rgba: 'Formato RGBA inválido. Ej: rgba(255, 0, 0, 1)',
  hsl: 'Formato HSL inválido. Ej: hsl(0, 100%, 50%)'
};

/**
 * Valida un color según su formato
 * @param {string} value - Valor del color a validar
 * @param {string} format - Formato del color ('hex', 'rgba', 'hsl')
 * @returns {Object} Objeto con isValid, message y normalizedValue (si aplica)
 */
export const validateColorInput = (value, format) => {
  if (!value.trim()) {
    return { isValid: false, message: 'El campo no puede estar vacío' };
  }

  let isValid = false;
  let normalizedValue = value;

  // Validación específica para HEX
  if (format === 'hex') {
    isValid = isValidHexColor(value);
    if (isValid) {
      normalizedValue = normalizeHexColor(value);
    }
  } else {
    // Para RGBA y HSL usamos la función original
    isValid = isValidColor(value);
  }

  if (!isValid) {
    return { 
      isValid: false, 
      message: COLOR_FORMAT_MESSAGES[format] || 'Color inválido' 
    };
  }

  return { isValid: true, message: 'Color válido', normalizedValue };
};

/**
 * Aplica un color validándolo previamente
 * @param {string} colorValue - Valor del color
 * @param {string} format - Formato del color
 * @param {Function} setColorCallback - Función para establecer el color
 * @param {Function} setValidationCallback - Función para establecer el estado de validación
 * @returns {boolean} true si el color se aplicó correctamente
 */
export const applyValidatedColor = (colorValue, format, setColorCallback, setValidationCallback) => {
  const validation = validateColorInput(colorValue, format);
  
  // Actualizar estado de validación
  setValidationCallback(prev => ({
    ...prev,
    [format]: validation
  }));
  
  if (validation.isValid) {
    // Para HEX, usar el valor normalizado si está disponible
    const colorToSet = validation.normalizedValue || colorValue;
    
    try {
      setColorCallback(colorToSet);
      return true;
    } catch (error) {
      console.warn('Error al establecer color:', error);
      // Si hay error, marcar como inválido
      setValidationCallback(prev => ({
        ...prev,
        [format]: { isValid: false, message: 'Error al procesar el color' }
      }));
      return false;
    }
  }
  
  return false;
};

/**
 * Restaura un input a su valor válido más reciente
 * @param {string} format - Formato del color
 * @param {string} inputValue - Valor actual del input
 * @param {string} fallbackColor - Color de respaldo válido
 * @param {Function} setInputCallback - Función para establecer valores de input
 * @param {Function} setValidationCallback - Función para establecer validación
 * @param {Function} colorUtilsFunction - Función de conversión de color utils
 */
export const restoreValidInput = (
  format, 
  inputValue, 
  fallbackColor, 
  setInputCallback, 
  setValidationCallback,
  colorUtilsFunction
) => {
  if (!inputValue.trim()) return;
  
  const validation = validateColorInput(inputValue, format);
  
  if (!validation.isValid) {
    // Restaurar valor válido
    setInputCallback(prev => ({
      ...prev,
      [format]: colorUtilsFunction(fallbackColor)
    }));
    
    // Reset validación
    setValidationCallback(prev => ({
      ...prev,
      [format]: { isValid: true, message: '' }
    }));
  } else if (format === 'hex' && validation.normalizedValue && validation.normalizedValue !== inputValue) {
    // Si es HEX y tenemos un valor normalizado diferente, aplicarlo
    setInputCallback(prev => ({
      ...prev,
      [format]: validation.normalizedValue
    }));
  }
};