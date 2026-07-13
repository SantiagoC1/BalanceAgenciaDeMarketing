# CLAUDE.md — Instrucciones de desarrollo para Balance Web

> Este archivo le indica a Claude Code cómo trabajar en este proyecto.
> Leer siempre antes de tocar cualquier archivo. Complementa `CONTEXT.md`.

---

## Reglas generales del proyecto

- Leer `CONTEXT.md` antes de empezar cualquier tarea.
- Estilos **solo con clases Tailwind** (v4, vía `@theme` en `index.css`). Nunca clases BEM ni CSS custom salvo que ya exista en `index.css`.
- Animaciones **solo con Framer Motion**. Nunca transiciones CSS manuales.
- Todas las llamadas HTTP van **exclusivamente** a través de `src/lib/api.ts`. No hacer `fetch` directo en componentes.
- Correr `npm run lint` después de cada cambio y corregir todos los errores antes de dar la tarea por terminada.
- Mobile-first: clases base sin prefijo para mobile, escalar con `md:` y `lg:`.
- No tocar `src/App.tsx` (está vacío intencionalmente; el routing vive en `main.tsx`).
- No eliminar `ServiciosSection.tsx`, `PortfolioSection.tsx` ni los componentes `ui/Button`, `ui/Card`, `ui/Section` sin confirmar con el equipo.

---

## Tarea 1 — Corregir el número de WhatsApp en el botón flotante

### Problema
`src/components/ui/WhatsAppButton.tsx` usa un número hardcodeado en vez de leerlo desde `useConfig`. El `Header.tsx` ya consume `useConfig` correctamente para su propio botón de WhatsApp en desktop — seguir ese mismo patrón.

### Archivos a modificar
- `src/components/ui/WhatsAppButton.tsx`

### Archivos a leer antes de modificar
- `src/hooks/useConfig.ts` — entender qué expone el hook (`config`, `loading`, etc.)
- `src/components/layout/Header.tsx` — ver cómo se usa `useConfig` para el número de WhatsApp ahí

### Qué hacer
1. Importar `useConfig` en `WhatsAppButton.tsx`.
2. Leer `config?.whatsappNumber` (o el campo equivalente que ya usa `Header.tsx`) desde el hook.
3. Usar ese valor para construir la URL `https://wa.me/{numero}`.
4. Mientras `loading` sea `true`, el botón puede ocultarse o mostrar un estado deshabilitado — no mostrar un número incorrecto.
5. No agregar ningún número hardcodeado como fallback. Si no hay config, no mostrar el botón.

### Criterio de éxito
- El botón flotante y el botón del Header usan exactamente la misma fuente de datos para el número.
- No hay ningún número de teléfono literal en el código de `WhatsAppButton.tsx`.

---

## Tarea 2 — Internacionalización ES / EN

### Objetivo
Agregar soporte para dos idiomas: español (`es`, por defecto) e inglés (`en`). El usuario cambia el idioma desde un botón en el Header. Todo el contenido visible de la landing debe traducirse. No se usa ninguna librería externa de i18n — la solución debe ser simple y propia.

### Arquitectura a implementar

#### 2a. Archivo de traducciones
Crear `src/i18n/translations.ts` con la siguiente estructura:

```ts
export type Locale = 'es' | 'en'

export const translations: Record<Locale, Record<string, string>> = {
  es: {
    // nav
    nav_about: 'Nosotras',
    nav_team: 'Equipo',
    nav_services: 'Servicios',
    nav_portfolio: 'Portfolio',
    nav_contact: 'Contacto',
    nav_cta: 'Hacer diagnóstico',
    // ... resto del contenido
  },
  en: {
    nav_about: 'About',
    nav_team: 'Team',
    nav_services: 'Services',
    nav_portfolio: 'Portfolio',
    nav_contact: 'Contact',
    nav_cta: 'Get a diagnosis',
    // ... resto del contenido
  }
}
```

Relevar TODOS los textos visibles de cada sección antes de escribir las claves. Recorrer estos archivos en orden:
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/SobreNosotras.tsx`
- `src/components/sections/Colaborador.tsx`
- `src/components/sections/Servicios.tsx`
- `src/components/sections/Portfolio.tsx`
- `src/components/sections/CTADiagnostico.tsx`
- `src/components/sections/Contacto.tsx`
- `src/components/sections/DiagnosticoModal.tsx`

#### 2b. Contexto de idioma
Crear `src/i18n/LanguageContext.tsx`:

```tsx
import { createContext, useContext, useState } from 'react'
import type { Locale } from './translations'

type LanguageContextType = {
  locale: Locale
  setLocale: (l: Locale) => void
}

export const LanguageContext = createContext<LanguageContextType>({
  locale: 'es',
  setLocale: () => {}
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('es')
  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
```

#### 2c. Hook de traducción
Crear `src/i18n/useTranslation.ts`:

```ts
import { useLanguage } from './LanguageContext'
import { translations } from './translations'

export function useTranslation() {
  const { locale } = useLanguage()
  const t = (key: string): string => translations[locale][key] ?? key
  return { t, locale }
}
```

#### 2d. Registrar el Provider en `main.tsx`
Envolver el árbol de rutas con `<LanguageProvider>` en `src/main.tsx`. El Provider debe quedar por fuera del `BrowserRouter` o dentro, pero siempre envolviendo `<Home/>`.

#### 2e. Botón de cambio de idioma en el Header
Modificar `src/components/layout/Header.tsx`:

- Agregar un toggle `ES | EN` en la barra de navegación desktop, a la derecha de los links y antes del CTA.
- En mobile, incluirlo dentro del menú hamburguesa.
- El idioma activo debe tener un estilo diferenciado (por ejemplo `text-brand-violet` o `font-bold`).
- Usar `useLanguage()` para leer y cambiar el locale.
- El botón debe ser accesible: incluir `aria-label` apropiado.

Ejemplo de markup mínimo:
```tsx
<button onClick={() => setLocale(locale === 'es' ? 'en' : 'es')} aria-label="Switch language">
  <span className={locale === 'es' ? 'text-brand-violet font-bold' : 'text-brand-gray'}>ES</span>
  <span className="mx-1 text-brand-gray">|</span>
  <span className={locale === 'en' ? 'text-brand-violet font-bold' : 'text-brand-gray'}>EN</span>
</button>
```

#### 2f. Reemplazar textos en cada componente
En cada sección, importar `useTranslation` y reemplazar los strings literales por `t('clave')`. No cambiar la estructura JSX ni los estilos — solo los textos.

```tsx
// Antes
<h2>Nuestros servicios</h2>

// Después
const { t } = useTranslation()
<h2>{t('services_title')}</h2>
```

#### 2g. Textos hardcodeados en arrays y objetos
`Servicios.tsx` y `Portfolio.tsx` tienen datos en arrays locales (`SERVICIOS_BALANCE`, `CASOS`). Para estos, crear versiones en ambos idiomas dentro de `translations.ts` usando claves indexadas, o bien mover los arrays a `translations.ts` directamente como objetos estructurados bajo `es` y `en`. Elegir la opción más limpia según el volumen de datos.

### Qué NO hacer
- No instalar librerías de i18n externas (`react-i18next`, `i18next`, `lingui`, etc.).
- No cambiar las rutas de React Router (sigue siendo solo `/`; el idioma vive en estado, no en la URL).
- No modificar `src/lib/api.ts` ni `src/hooks/useConfig.ts` para esta tarea.
- No cambiar estilos, layouts ni animaciones al reemplazar textos.

### Criterio de éxito
- Al hacer clic en el toggle del Header, todo el contenido visible de la página cambia de idioma sin recargar.
- En español, el sitio se ve exactamente igual que antes de este cambio.
- No hay strings en inglés en el código fuera de `src/i18n/translations.ts`.
- No hay strings en español hardcodeados en componentes (todo pasa por `t()`).
- `npm run lint` pasa sin errores.
- `npm run build` pasa sin errores de TypeScript.

---

## Orden de ejecución recomendado

1. Leer `CONTEXT.md` completo.
2. Ejecutar **Tarea 1** (WhatsApp dinámico) — es pequeña y aislada.
3. Correr `npm run lint` y verificar que pasa.
4. Ejecutar **Tarea 2** en el orden de pasos indicado (2a → 2b → 2c → 2d → 2e → 2f → 2g).
5. Correr `npm run lint` y `npm run build` al finalizar.
6. Reportar cualquier ambigüedad encontrada en los textos originales antes de inventar traducciones.
