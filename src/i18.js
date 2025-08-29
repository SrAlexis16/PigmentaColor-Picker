import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/locales/en/translation.json';
import es from '@/locales/es/translation.json';

i18n
  // Detecta el idioma del navegador
  .use(LanguageDetector)
  .use(initReactI18next)
  // Inicializa i18n
  .init({
    // La traducción que se usará por defecto si el idioma del usuario no está disponible
    fallbackLng: 'es', 
    // Los recursos (tus archivos JSON de traducción)
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    // La clave para acceder a las traducciones
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      // Evita la inyección de código XSS
      escapeValue: false, 
    },
  });

export default i18n;