# 🎨 Pigmenta Color Picker

> **Aplicación integral de selección de colores con tres modos especializados para Artistas, Diseñadores y Desarrolladores**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](#)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4+-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Chroma.js](https://img.shields.io/badge/Chroma.js-2+-ff6b6b.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## 🚀 Descripción

El Selector de Colores Avanzado es una herramienta web moderna que revoluciona el trabajo con colores mediante tres modos especializados. Combina análisis científico de color, conversiones de formato en tiempo real y herramientas creativas en una interfaz intuitiva y multiidioma.

### 🎯 ¿Por qué elegir este Selector de Colores?

- **🔬 Análisis Científico**: Cálculos precisos de luminancia, saturación, contraste y Delta E
- **⚡ Sincronización en Tiempo Real**: Cambios instantáneos reflejados en los tres modos simultáneamente
- **🌐 Multiidioma**: Interfaz completamente localizada en inglés y español

## ✨ Características Principales

### 🎨 Modo Artista
**Herramientas creativas para profesionales del arte**
- **Generación de Paletas**: Creación automática de paletas armoniosas
- **Mezcla de Colores Intuitiva**: Sistema avanzado de mixing con control de prioridad
- **Paletas Predefinidas**: Colecciones curadas para diferentes estilos artísticos
- **Preview en Tiempo Real**: Visualización instantánea de combinaciones de colores

### 🖼️ Modo Diseñador
**Análisis de accesibilidad y herramientas profesionales**
- **Análisis de Accesibilidad WCAG**: Verificación automática de ratios de contraste
- **Color Wheel Interactivo**: Ajuste preciso de brillo, saturación y opacidad
- **Vista Previa Contextual**: Simulación de elementos de diseño con los colores seleccionados
- **Evaluación de Legibilidad**: Análisis de contraste contra fondos múltiples
- **Recomendaciones Automáticas**: Sugerencias para mejorar la accesibilidad

### 👨‍💻 Modo Desarrollador
**Suite técnica completa para desarrollo web**
- **Conversión Universal**: Soporte para HEX, RGBA, HSL, CIELAB, CMYK
- **Información Técnica Detallada**: Luminancia, saturación, análisis Delta E
- **Sketch Simple Integrado**: Herramienta de bocetado rápido
- **Inputs Dinámicos**: Modificación directa de valores de color
- **Análisis de Contraste**: Cálculos precisos según estándares web
- **Exportación de Código**: Generación automática de variables CSS/SCSS

### 🌐 Sistema Multiidioma
**Localización completa**
- Interfaz en **Español** e **Inglés**
- Cambio dinámico de idioma sin recarga
- Terminología técnica localizada apropiadamente

## 🛠️ Stack Tecnológico

| Tecnología | Propósito | Beneficio |
|------------|-----------|-----------|
| **React 18+** | Frontend Framework | Componentes reactivos y hooks modernos |
| **Vite** | Build Tool | Desarrollo ultrarrápido y HMR optimizado |
| **Chroma.js** | Motor de Color | Cálculos científicos de color precisos |
| **React Context** | Estado Global | Sincronización cross-mode eficiente |
| **CSS Custom** | Estilos | Diseño responsivo y personalizado |

## 📦 Instalación y Configuración

### Prerrequisitos del Sistema
```bash
Node.js >= 16.0.0
npm >= 8.0.0 o yarn >= 1.22.0
Git
```

### Instalación Rápida

```bash
# 1. Clonar repositorio
git clone [url-del-repositorio]
cd selector-colores-avanzado

# 2. Instalar dependencias
npm install

# 3. Iniciar desarrollo
npm run dev
```

### Scripts de Desarrollo

```bash
npm run dev      # Servidor de desarrollo
```

🌐 **Acceso**: `http://localhost:5173`

## 🎯 Casos de Uso

### Para Artistas Digitales
- Creación de paletas para ilustraciones
- Experimentación con mezclas de color
- Desarrollo de esquemas cromáticos coherentes

### Para Diseñadores UX/UI
- Verificación de accesibilidad WCAG
- Análisis de contraste para interfaces
- Selección de colores para sistemas de diseño

### Para Desarrolladores Web
- Conversión entre formatos de color
- Generación de variables CSS
- Análisis técnico de propiedades cromáticas

### Para Sectores Específicos
- **Branding**: Desarrollo de identidades visuales
- **Marketing Digital**: Creación de materiales accesibles
- **Desarrollo Web**: Implementación de design systems

## ⚡ Consideraciones de Rendimiento

### Arquitectura de Alto Rendimiento
- **Cálculos Científicos Complejos**: Análisis matemático avanzado de colores en tiempo real
- **Sincronización Multi-Modal**: Updates simultáneos en tres interfaces especializadas
- **Procesamiento Intensivo**: 15-20+ operaciones de chroma.js por cambio de color

### Compromisos de Diseño
```javascript
// Ejemplo del volumen de operaciones por cambio:
Main Color Update →
├── Análisis (6+ funciones): contraste, luminancia, saturación, Delta E
├── Conversiones (5+ funciones): HEX, RGBA, HSL, CMYK, CIELAB  
└── Renderizado Multi-Modal: Artista + Diseñador + Desarrollador
```

### Herramientas de Diagnóstico (Desarrollo)

El proyecto incluye sistema de performance profiling para análisis avanzado:

#### 📊 Monitor de Análisis - `lib/analysis.js`
```javascript
// Sistema de logging para funciones de análisis de color
export const getPerformanceReport = () => {
  console.log(`📊 Reporte de Rendimiento: ${chromaCallCount} llamadas a chroma en ${totalTime}ms`);
  return { totalCalls: chromaCallCount, sessionDuration: totalTime };
};

// Funciones monitoreadas:
// getContrastRatio, isLight, getLuminance, getSaturation, getDeltaE, mixColors
```

#### 🔄 Monitor de Conversiones - `lib/conversions.js`
```javascript
// Sistema de logging para conversiones de formato
export const getConversionReport = () => {
  console.log(`📈 Reporte de Conversiones: ${conversionCallCount} conversiones en ${totalTime}ms`);
  return { totalCalls: conversionCallCount, sessionDuration: totalTime };
};

// Funciones monitoreadas:
// toHex, toRgba, toHsl, toCmyk, toCielab, hexToHsl, hslToHex, toRgb, applyOpacity
```

#### 🔍 Análisis de Performance
```javascript
// En consola del navegador después de interacciones:
getPerformanceReport();    // Análisis de funciones científicas
getConversionReport();     // Análisis de conversiones de formato
```

## 📁 Arquitectura del Proyecto

```
src/
├── components/
│   ├── modules/                     # Modos principales
│   │   ├── ArtistView/             # Herramientas artísticas
│   │   ├── DesignerView/           # Análisis de accesibilidad
│   │   ├── DeveloperView/          # Suite técnica
│   │   ├── DocumentationView/      # Documentación integrada
│   │   └── SettingsView/           # Configuración multiidioma
│   │
│   ├── ui                           # Componentes base
│   ├── ColorInput.jsx          # Input de colores
│   ├── ColorSwatch.jsx         # Muestras de color
│   ├── Footer.jsx              # Footer de aplicación
│   ├── Navbar.jsx              # Navegación principal
│   └── ViewsGeneral.jsx        # Vista general
│
├── context/                        # Estados globales de la app
├── hooks/                          # Custom hooks de React
├── layout/                         # Componentes de layout
├── lib/                           # Utilidades y lógica de negocio
├── locales/                       # Archivos de internacionalización
├── views/                         # Páginas y vistas principales
├── App.jsx                    # Componente principal
├── custom-styles.css          # Estilos personalizados
├── i18n.js                    # Configuración de idiomas
├── index.css                  # Estilos base
├── main.jsx                       # Punto de entrada de React
```

## 🤝 Contribuyendo

Este es un proyecto personal de portafolio que demuestra:
- Gestión compleja de estado global
- Arquitectura multi-modal sincronizada  
- Integración avanzada de librerías científicas
- Desarrollo de interfaces especializadas por usuario

### 🔄 Optimizaciones Potenciales
- **Debouncing**: Implementar delays en actualizaciones de color
- **Memoización**: Cache de cálculos repetidos para mejor performance
- **Lazy Loading**: Carga diferida de modos no activos
- **Web Workers**: Procesamiento de cálculos pesados en background

## 📝 Notas de Desarrollo

- **Performance Profiling**: Sistema de logging habilitado para análisis detallado
- **Arquitectura SPA**: Página única para cambios de modo fluidos
- **Cálculos de Alto Volumen**: Diseñado para análisis comprehensivo en tiempo real
- **Trade-offs Conscientes**: UX prioritizada sobre optimizaciones

## 📄 Licencia

Este proyecto está distribuido bajo la Licencia MIT.

Esto significa que cualquier persona puede usar, copiar, modificar y distribuir el código con libertad, incluso para fines comerciales.  
Solo se requiere mantener el aviso de copyright original y aceptar que el software se entrega "tal cual", sin garantías.

Ver el archivo [`LICENSE`](./LICENSE) para más información detallada.

## 👨‍💻 Autor

**Alexander Arana**
- GitHub: [@SrAlexis16](https://github.com/SrAlexis16)  

---

<div align="center">

*Construido con ❤️ para profesionales creativos y técnicos*

</div>

---

**Nota Técnica**: Esta aplicación prioriza completitud de características y experiencia de usuario sobre potenciales optimizaciones. Las características de rendimiento resultan del análisis científico comprehensivo de colores en tiempo real entre múltiples modos especializados, no de prácticas de codificación ineficientes.