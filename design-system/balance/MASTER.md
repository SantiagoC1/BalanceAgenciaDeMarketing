# Balance — Design System MASTER

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Balance
**Category:** Marketing Agency — Comunicación y Marketing para marcas y líderes

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Black | `#171616` | `--color-brand-black` |
| White | `#FFFFFF` | `--color-brand-white` |
| Gray | `#E6E6E6` | `--color-brand-gray` |
| Violet | `#4C4CE6` | `--color-brand-violet` |
| Green | `#ABC652` | `--color-brand-green` |

**Color Notes:** Violet es el acento principal (CTAs, highlights). Green es el acento secundario (palabras clave en texto). Alternar secciones entre negro y blanco. Usar gris con criterio, máximo una sección seguida.

### Typography

- **Heading Font:** Gotham Bold / Black — fallback: Plus Jakarta Sans 700/900
- **Script/Cursiva highlights:** Rumble Brave — fallback gratuito: Dancing Script (Google Fonts)
- **Body Font:** Gotham Regular — fallback: DM Sans 400

**Regla clave:** Las palabras en script cursiva siempre en `--color-brand-violet` o `--color-brand-green`, nunca en negro. Usar script solo en 1-3 palabras highlight, nunca en párrafos.

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=DM+Sans:wght@400;500;700;900&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #4C4CE6;
  color: white;
  padding: 12px 28px;
  border-radius: 6px;
  font-weight: 700;
  font-family: 'DM Sans', sans-serif;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: #3b3bd4;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(76,76,230,0.35);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #4C4CE6;
  border: 2px solid #4C4CE6;
  padding: 12px 28px;
  border-radius: 6px;
  font-weight: 700;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #4C4CE6;
  color: white;
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #E6E6E6;
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  border-color: #4C4CE6;
  box-shadow: 0 8px 24px rgba(76,76,230,0.12);
  transform: translateY(-2px);
}

/* Card sobre fondo negro */
.card-dark {
  background: #1f1f1f;
  border: 1px solid #2a2a2a;
}

.card-dark:hover {
  border-color: #ABC652;
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1.5px solid #E6E6E6;
  border-radius: 6px;
  font-size: 16px;
  font-family: 'DM Sans', sans-serif;
  background: white;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #4C4CE6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(76,76,230,0.15);
}
```

---

## Style Guidelines

**Style:** Neubrutalism suavizado — bordes definidos, tipografía bold con peso, sombras con offset, sin glassmorphism.

**Keywords:** Bold typography, strong contrast, personality, clean but with character, alternating dark/light sections

**Best For:** Agencias creativas, marcas con personalidad, portfolios que quieren destacar

**Key Effects:** 
- Texto script en violet/green para highlights
- Hover con border-color brand-violet en cards
- Botones con sombra violet en hover
- Transiciones 200ms ease en todo
- Secciones alternas negro/blanco sin gris como protagonista

### Page Pattern

**Pattern Name:** Storytelling-Driven + Social Proof

- **CTA Placement:** Above fold + repetido al final
- **Section Order:** Hero > Sobre Nosotras > Servicios > Portfolio CTA > Diagnóstico CTA

---

## Anti-Patterns (Do NOT Use)

- ❌ **Glassmorphism / Liquid Glass** — No es la identidad de Balance
- ❌ **Paleta rosa/pink** — El output automático de UI/UX Pro Max no aplica aquí
- ❌ **Gris #E6E6E6 como fondo de más de 1 sección seguida**
- ❌ **Script en párrafos** — Solo en palabras highlight (1-3 palabras máximo)
- ❌ **Mezclar violet y green en el mismo elemento**
- ❌ **Emojis como íconos** — Usar Lucide exclusivamente
- ❌ **Missing cursor:pointer** — Todos los elementos clickeables
- ❌ **Layout-shifting hovers** — Sin scale transforms que rompan el layout
- ❌ **Low contrast text** — Mínimo 4.5:1
- ❌ **Instant state changes** — Siempre transitions 150-300ms
- ❌ **Invisible focus states**

---

## Pre-Delivery Checklist

- [ ] Paleta correcta: negro, blanco, gris, violet, green — sin rosa ni cyan
- [ ] Script (Dancing Script) solo en palabras highlight en violet o green
- [ ] Secciones alternas negro/blanco correctamente
- [ ] Todos los íconos de Lucide
- [ ] `cursor-pointer` en todos los elementos clickeables
- [ ] Hover states con transitions 200ms
- [ ] Contraste 4.5:1 mínimo (especialmente texto sobre violet)
- [ ] `prefers-reduced-motion` respetado
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] Sin scroll horizontal en mobile
- [ ] Sin contenido tapado por el header fijo
---

## Contenido Real

### Servicios (3)
1. **Gestión y estrategias de contenidos digitales**
   Planificación estratégica, producción y edición de contenido, análisis de métricas.

2. **Arquitectura de marca**
   Identidad visual completa: logo, tipografías, paleta, tono de voz, manual de identidad.

3. **Consultorías y mentoría de impacto**
   Hoja de ruta, auditorías, capacitaciones, diagnósticos de percepción, mentoría.

### Portfolio (4 casos)
1. **Cruz del Sur** — Consultorios Médicos
   Categorías: Arquitectura de marca / Estrategia & narrativa digital

2. **Grow** — Centro de Alto Rendimiento
   Categorías: Arquitectura de marca / Estrategia & narrativa digital

3. **Glow Pro** — Marca de guantes para arqueros
   Categoría: Estrategia & narrativa digital

4. **Bocaditos** — Coffee & Culture (USA)
   Categoría: Estrategia & narrativa digital

### Redes sociales
- LinkedIn: https://www.linkedin.com/in/balance-group-752621286
- Behance: https://www.behance.net/balancegroup
- Instagram: pendiente