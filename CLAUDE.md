# Balance Web — Guía para Claude

## Stack

React + Vite + TypeScript + TailwindCSS + React Router v6 + Framer Motion

## Comandos

```bash
npm run dev      # servidor local
npm run build    # build de producción
npm run lint     # ESLint
```

## Convenciones de código

- **Named exports** en todos los componentes, nunca `default export`
- **Props siempre tipadas** con `interface`, nunca inline
- Hooks personalizados en `src/hooks/`
- Llamadas a la API **solo** desde `src/lib/api.ts`
- Nunca hardcodear colores, solo clases de Tailwind del design system

## Estructura de carpetas

| Ruta | Contenido |
|---|---|
| `src/components/ui/` | Componentes base reutilizables (Button, Card, Section…) |
| `src/components/layout/` | Header y Footer |
| `src/components/sections/` | Secciones de páginas (Hero, Servicios, Portfolio…) |
| `src/pages/` | Páginas completas (una por ruta) |
| `src/hooks/` | Hooks personalizados |
| `src/lib/` | `api.ts` (fetches) y `types.ts` (tipos TypeScript) |

## Workflow

- Después de **cada cambio** correr: `npm run lint`
- Los componentes que consumen config del Sheet usan el hook `useConfig`
- La URL del Apps Script viene de `import.meta.env.VITE_APPS_SCRIPT_URL`

## Reglas importantes

- **Mobile-first** siempre; escalar con `md:` y `lg:`
- **Animaciones** solo con Framer Motion, nunca CSS transitions manuales
- **Accesibilidad:** `alt` en imágenes, `aria-label` en botones sin texto visible
