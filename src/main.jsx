import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import "@/custom-styles.css"
import App from './App.jsx'
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18.js' 
import { PreferencesProvider } from "@/context/PreferencesContext.jsx";
import { Toaster } from 'sonner';
import { ViewProvider } from "@/context/ViewContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ViewProvider>
      <PreferencesProvider>
        <I18nextProvider i18n={i18n}>
          <App /> 
        </I18nextProvider>
      </PreferencesProvider>
    </ViewProvider>
    <Toaster position="top-right" richColors closeButton visibleToasts={3} duration={3000} />
  </StrictMode>
)
