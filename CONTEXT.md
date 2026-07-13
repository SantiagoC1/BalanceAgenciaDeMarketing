# CONTEXT.md — Balance Web

> Documento de contexto completo del proyecto, pensado para que cualquier sesión de desarrollo (humana o con Claude) pueda entender el sitio sin tener que releer todo el código desde cero.

---

## 1. Descripción general

**Balance** es el sitio institucional (landing page) de una agencia de comunicación y marketing dirigida a marcas y líderes. Fundada por **Pili** (Dirección de Marketing & Estrategia) y **Pachi** (Dirección de Comunicación & Experiencia de marca).

El sitio es de una sola página (`/`) con scroll continuo por secciones ancladas (`#nosotras`, `#equipo`, `#servicios`, `#portfolio`, `#contacto`) y cumple dos funciones principales:

- **Presentación comercial**: mostrar servicios, equipo y portfolio de casos de éxito (con videos) para captar nuevos clientes.
- **Generación de leads**: un modal de "diagnóstico" (formulario multi-paso) que envía los datos a un Google Sheet vía Google Apps Script, además de un botón flotante de WhatsApp.

Está dirigido a marcas, negocios y líderes/emprendedores que buscan mejorar su comunicación digital y estrategia de marketing (target argentino, precios en pesos).

Desarrollado por **SCdev** (scdev.com.ar).

---

## 2. Stack tecnológico

| Categoría | Tecnología | Versión |
|---|---|---|
| Framework UI | React | ^19.2.6 |
| Build tool | Vite | ^8.0.12 |
| Lenguaje | TypeScript | ~6.0.2 |
| Estilos | Tailwind CSS (plugin Vite, sin config.js — todo vía `@theme` en CSS) | ^4.3.0 |
| Routing | React Router DOM | ^7.15.1 |
| Animaciones | Framer Motion | ^12.40.0 |
| Iconos | lucide-react | ^1.16.0 |
| Linting | ESLint + typescript-eslint | ^10.3.0 / ^8.59.2 |
| Backend / DB | Google Apps Script + Google Sheets (sin backend propio) | — |
| Hosting | Netlify | — |
| Utilidad de build | `sharp` (script `generate-og.mjs` para imagen Open Graph) | ^0.34.5 |

No hay backend propio ni base de datos tradicional: Google Sheets actúa como "base de datos liviana" a través de un Web App de Apps Script.

---

## 3. Estructura de carpetas

```
balance-web/
├── src/
│   ├── assets/
│   │   ├── images/         # Logos (variantes FB/FN/completo/corto) y fotos del equipo
│   │   └── videos/         # Videos de portfolio y hero (excluidos del repo, ver .gitignore)
│   ├── components/
│   │   ├── layout/         # Header, Footer, Layout (wrapper con <Outlet/>)
│   │   ├── sections/       # Una sección de la landing por archivo
│   │   └── ui/             # Componentes base reutilizables
│   ├── hooks/
│   │   └── useConfig.ts    # Hook que trae config/servicios/formConfig desde Apps Script
│   ├── lib/
│   │   ├── api.ts          # Único punto de llamadas HTTP (fetch a Apps Script)
│   │   └── types.ts        # Tipos TS compartidos (Servicio, SiteConfig, Lead, ApiResponse)
│   ├── pages/
│   │   └── Home.tsx        # Única página de la app; compone todas las secciones
│   ├── App.tsx              # Vacío / no usado (el routing real vive en main.tsx)
│   ├── main.tsx             # Entry point: BrowserRouter + <Route path="/" element={<Home/>} />
│   └── index.css            # Import de fuentes, `@theme` de Tailwind v4, reset base
├── public/                  # Estáticos servidos tal cual: favicon, robots.txt, sitemap.xml, _headers, _redirects (Netlify), og-image.jpg
├── scripts/
│   └── generate-og.mjs      # Script Node con sharp para generar la imagen Open Graph
├── design-system/balance/MASTER.md  # Fuente de verdad del design system (colores, tipografía, specs de componentes)
├── .claude/                 # Config y skills de Claude Code para este repo (no afecta runtime)
├── index.html                # HTML base con metatags SEO/OG
├── vite.config.ts             # Plugins (react, tailwindcss), manualChunks (vendor/motion/router), soporte de video como asset
├── tsconfig*.json             # Config TS (app/node split)
├── eslint.config.js
└── package.json
```

**Nota:** `src/App.tsx` está vacío a propósito (comentario explícito: "El enrutamiento vive en main.tsx"). Es un remanente del scaffold de Vite que no se usa.

---

## 4. Páginas y rutas

El proyecto define una sola ruta real en `src/main.tsx`:

| Ruta | Componente | Contenido |
|---|---|---|
| `/` | `Home` (`src/pages/Home.tsx`) | Landing completa de una sola página, compuesta por (en orden): `Hero` → `SobreNosotras` → `Servicios` → `Colaborador` → `Portfolio` → `CTADiagnostico` → `Contacto`. Además monta el `DiagnosticoModal` (controlado por estado `modalOpen`) y el `WhatsAppButton` flotante. |

La navegación interna entre secciones se hace con anclas (`#nosotras`, `#equipo`, `#servicios`, `#portfolio`, `#contacto`) definidas en `Header` y `Footer`, no con rutas de React Router. React Router está instalado pero, dado que hay una sola ruta, actualmente cumple un rol mínimo (fácil de extender a futuro si se agregan más páginas).

**Nota:** existen `ServiciosSection.tsx` y `PortfolioSection.tsx` en `src/components/sections/` que parecen versiones placeholder/antiguas (usan un componente `Section` genérico y muestran "Cargando…"). Solo `ServiciosSection` está exportado en `index.ts`, pero `Home.tsx` usa `Servicios` (la versión con contenido real y acordeón), no `ServiciosSection`. Esto sugiere código muerto/en transición — revisar antes de modificar cualquiera de los dos.

---

## 5. Componentes principales

### Layout (`src/components/layout/`)
- **`Header.tsx`** — Nav sticky con logo, links de anclas, CTA "Hacer diagnóstico", botón WhatsApp (desktop) y menú hamburguesa animado (mobile). Usa `useConfig` para el número de WhatsApp.
- **`Footer.tsx`** — Logo, nav secundaria, íconos de redes (Instagram/LinkedIn/Behance, SVG inline porque lucide-react v1.16 no trae íconos de marca), crédito a SCdev.
- **`Layout.tsx`** — Envuelve Header + `<main>` + Footer; acepta `children` o `<Outlet/>` de React Router.

### Sections (`src/components/sections/`)
- **`Hero.tsx`** — Sección principal con video de fondo (`videoHero.mp4`), animaciones stagger con Framer Motion, contenido dinámico vía `useConfig`.
- **`SobreNosotras.tsx`** — Presentación de la agencia con fotos de Pili y Pachi, animaciones slide-in.
- **`Colaborador.tsx`** — Grid del equipo (Pili, Pachi, Santiago) con overlays de color (violeta/verde) al hover.
- **`Servicios.tsx`** — Lista/acordeón de servicios (`SERVICIOS_BALANCE`), expandible con `ChevronDown`, datos hardcodeados en el propio archivo (no vienen de Sheets todavía).
- **`Portfolio.tsx`** — Casos de éxito con video por caso (Cruz del Sur, Grow, Glow Pro, Bocaditos), datos hardcodeados (`CASOS`).
- **`CTADiagnostico.tsx`** — Sección oscura de llamado a la acción con efecto de texto fantasma "BALANCE" animado.
- **`Contacto.tsx`** — Sección de contacto con íconos de redes y botón que abre el modal de diagnóstico (`onOpen`).
- **`DiagnosticoModal.tsx`** — Formulario multi-paso (wizard) que recolecta datos del lead y los envía con `submitLead` (`lib/api.ts`). Recibe `formConfig` (opciones de selects) desde `useConfig`.
- **`ServiciosSection.tsx` / `PortfolioSection.tsx`** — Placeholders no usados en `Home.tsx` (ver nota en sección 4).

### UI (`src/components/ui/`)
- **`Button.tsx`** — Botón genérico con variantes `primary | secondary | outline` y tamaños `sm | md | lg`. **Nota:** usa clases BEM-like (`button--primary`, etc.) en vez de clases Tailwind directas — no parece seguir el patrón de estilos inline con Tailwind que usan el resto de los componentes (Header, Footer, Hero). Posible componente legacy/sin usar activamente en las secciones reales.
- **`Card.tsx`** — Tarjeta genérica con `title`/`description`/`children`, también con clases BEM-like (`card__title`). Mismo caso que `Button`.
- **`Section.tsx`** — Wrapper de sección genérico con `title`/`subtitle`, usado solo por los placeholders `ServiciosSection`/`PortfolioSection`.
- **`WhatsAppButton.tsx`** — Botón flotante fijo (bottom-right) que linkea a `wa.me/{numero}`, con número configurable vía `useConfig`.

### Hooks (`src/hooks/`)
- **`useConfig.ts`** — Hook central que llama a `getConfig()` (`lib/api.ts`) al montar, expone `{ config, servicios, formConfig, loading }`. Tiene un `FALLBACK_FORM_CONFIG` hardcodeado para que el modal de diagnóstico funcione aunque falle la carga desde Sheets. Nota: define sus propios tipos `SiteConfig`/`Servicio`/`FormConfig` locales, distintos de los tipos homónimos en `lib/types.ts` (duplicación a tener en cuenta si se refactoriza).

### Lib (`src/lib/`)
- **`api.ts`** — Único archivo permitido para llamadas a la API (regla del proyecto). Expone `submitLead()` (POST a Apps Script, `mode: 'no-cors'` porque Apps Script no devuelve headers CORS legibles), `getConfig()` (GET `?action=config`, trae config/servicios/portfolio/formConfig crudos) y `fetchSiteConfig()` (wrapper tipado que mapea la respuesta cruda a `SiteConfig`, con manejo de `ApiResponse<T>`).
- **`types.ts`** — Tipos compartidos: `Servicio`, `ProyectoPortfolio`, `SiteConfig`, `Lead`, `ApiResponse<T>`.

---

## 6. Variables de entorno y configuración

| Variable | Dónde se usa | Descripción |
|---|---|---|
| `VITE_APPS_SCRIPT_URL` | `src/lib/api.ts` (`import.meta.env.VITE_APPS_SCRIPT_URL`) | URL del Web App de Google Apps Script que actúa como backend (recibe leads y sirve la config dinámica). Se define en `.env.local` (no versionado, ver `.gitignore`) y debe configurarse también como env var en el dashboard de Netlify para producción. |

El Google Sheet subyacente tiene (según `README.md`) 4 tabs: `Leads`, `Config`, `Servicios`, `Portfolio` — estos dos últimos están previstos para integración dinámica futura, pero actualmente `Servicios.tsx` y `Portfolio.tsx` usan datos hardcodeados en el componente en vez de consumir `servicios`/`portfolio` de `useConfig`/`api.ts`.

No hay otras variables de entorno ni secretos en el frontend (no debe haberlos, dado que es un sitio 100% cliente).

---

## 7. Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Crear .env.local en la raíz con:
# VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_URL/exec

# Servidor de desarrollo
npm run dev

# Build de producción (tsc -b && vite build)
npm run build

# Preview del build de producción
npm run preview

# Lint (correr después de cada cambio, según CLAUDE.md)
npm run lint
```

Deploy: Netlify, build command `npm run build`, publish directory `dist`. Los archivos `public/_headers` y `public/_redirects` configuran headers/redirects de Netlify.

---

## 8. Estado actual y notas

- **Datos hardcodeados vs. dinámicos**: `Servicios.tsx` y `Portfolio.tsx` usan arrays hardcodeados (`SERVICIOS_BALANCE`, `CASOS`) en vez de los datos que ya trae `useConfig`/`getConfig()` desde el Sheet (`servicios`, `portfolio`). El backend ya soporta esa data dinámica pero el frontend todavía no la consume ahí — parece deuda técnica pendiente o una migración a medio camino.
- **Componentes placeholder sin usar**: `ServiciosSection.tsx` y `PortfolioSection.tsx` (y los componentes `Section`, `Card`, `Button` de `ui/` con clases BEM-like en vez de Tailwind) no se usan en el flujo real de `Home.tsx`. Podrían ser un intento anterior de arquitectura, o componentes pensados para reusar en páginas futuras. Confirmar con el equipo antes de eliminarlos o de usarlos como base para nueva UI, ya que rompen la convención "solo Tailwind, nunca clases custom" del resto del código.
- **Duplicación de tipos**: existen dos definiciones distintas de `SiteConfig`/`Servicio` — una en `src/lib/types.ts` (usada por `fetchSiteConfig`) y otra en `src/hooks/useConfig.ts` (usada por el hook real que consumen los componentes). Si se toca la forma de la config en Apps Script, hay que actualizar ambas.
- **`src/App.tsx` está vacío intencionalmente** — no borrar sin revisar si algo lo importa; el entry real es `main.tsx`.
- **Videos pesados excluidos del repo** (`src/assets/videos/`, ver `.gitignore`): deben subirse manualmente al servidor/Netlify. Los nombres de archivo deben coincidir exactamente con los que importan los componentes (`cruzDelSur.mp4`, `grow.mp4`, `glowPro.mp4`, `bocaditos.mp4`, `videoHero.mp4` / `videoHeroRecortado.mp4`).
- **`mode: 'no-cors'` en `submitLead`**: la respuesta de Apps Script es "opaque" — no se puede leer el body ni el status real. El código asume éxito si `fetch` no lanza una excepción de red, lo cual no garantiza que Apps Script haya procesado el lead correctamente (solo que la request salió). Tenerlo en cuenta al debuggear leads "perdidos".
- **Design system documentado aparte**: `design-system/balance/MASTER.md` es la fuente de verdad de estilos (colores, tipografía, spacing, shadows, specs de botones/cards). Ver sección 9 más abajo — está mayormente alineado con `index.css`, pero define fuentes ideales (Gotham, Rumble Brave) que en código caen a sus fallbacks gratuitos (DM Sans, Dancing Script) porque las fuentes pagas no están licenciadas/importadas.
- **Skills de Claude Code** en `.claude/skills/`: hay skills específicas del proyecto (`design-system`, `component-patterns`, `apps-script-integration`) pensadas para guiar el desarrollo asistido — consultarlas antes de tocar estilos, patrones de componentes o la integración con Apps Script.

---

## 9. Identidad visual

Fuente: `src/index.css` (implementación real) + `design-system/balance/MASTER.md` (spec de diseño).

### Paleta de colores

Definida como Tailwind v4 `@theme` (variables CSS, uso vía clases `bg-brand-*` / `text-brand-*`):

| Rol | Variable Tailwind | Hex | Uso |
|---|---|---|---|
| Negro | `brand-black` | `#171616` | Fondos oscuros (CTA, footer), texto principal |
| Blanco | `brand-white` | `#FFFFFF` | Fondos claros, texto sobre oscuro |
| Gris | `brand-gray` | `#E6E6E6` | Bordes, separadores, texto secundario — usar con criterio, máximo una sección seguida en gris |
| Violeta | `brand-violet` | `#4C4CE6` | **Acento principal**: CTAs, links hover, highlights |
| Verde | `brand-green` | `#ABC652` | **Acento secundario**: WhatsApp button, palabras clave destacadas en texto |

Regla de diseño: alternar secciones entre fondo negro y blanco a lo largo de la landing; el script cursiva (ver tipografía) siempre debe ir en violeta o verde, nunca en negro.

### Tipografía

- **Fuente de cuerpo/heading**: `DM Sans` (Google Fonts), pesos 400/500/700/900, itálica incluida — clase utilitaria `.font-display`. Es el fallback gratuito de la fuente ideal del design system (`Gotham` Regular/Bold/Black), que no está licenciada en el proyecto.
- **Fuente script/cursiva**: `Dancing Script` (peso 700) — clase utilitaria `.font-script`, usada solo para 1-3 palabras destacadas (nunca párrafos completos), siempre en color violeta o verde. Fallback gratuito de `Rumble Brave`.
- Import de Google Fonts al inicio de `src/index.css`.

### Estilos globales

- `scroll-behavior: smooth` en `<html>` (scroll suave al navegar por anclas).
- Reset de `box-sizing: border-box` global.
- `body` sin márgenes, `-webkit-font-smoothing: antialiased`.
- Utilidad `.scrollbar-hide` para ocultar scrollbars (usada en carruseles/listas horizontales).
- Spacing y shadows documentados como tokens en `design-system/balance/MASTER.md` (`--space-xs` a `--space-3xl`, `--shadow-sm` a `--shadow-xl`) pero **no** están definidos como `@theme` en `index.css` — actualmente los componentes usan las utilidades de spacing/shadow nativas de Tailwind (`p-6`, `shadow-sm`, etc.) directamente, no los tokens custom del MASTER.md. Si se necesita spacing consistente con el design system, revisar `design-system/balance/MASTER.md` como referencia manual.
- Animaciones: exclusivamente con Framer Motion (`motion.div`, `AnimatePresence`, `variants`), nunca transiciones CSS manuales (regla explícita del proyecto en `CLAUDE.md`).
- Mobile-first: clases base sin prefijo apuntan a mobile, se escala con `md:`/`lg:`.
