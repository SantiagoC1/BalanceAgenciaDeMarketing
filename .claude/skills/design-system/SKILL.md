# Design System — Balance

## Identidad visual

Estética **premium, minimalista y oscura**. Espaciado generoso, tipografía limpia, sin ruido visual.
El negro profundo es el fondo absoluto; el dorado/arena es el único acento cromático; el blanco puro es el texto principal.

## Paleta de colores

| Token Tailwind    | Hex       | Uso                                              |
|-------------------|-----------|--------------------------------------------------|
| `brand-dark`      | `#0a0a0a` | Fondo base (body, secciones oscuras)             |
| `brand-dark-soft` | `#111111` | Fondo de cards, contenedores elevados            |
| `brand-dark-mid`  | `#1a1a1a` | Bordes sutiles, separadores                      |
| `brand-light`     | `#ffffff` | Texto principal, iconos sobre fondo oscuro       |
| `brand-light-muted`| `#a3a3a3`| Texto secundario, subtítulos, metadatos          |
| `brand-accent`    | `#c9a96e` | Acento dorado/arena: CTAs, highlights, subrayados|
| `brand-accent-dim`| `#a8864f` | Acento en hover/estado activo                    |

## Cómo registrar los tokens (Tailwind v4)

El proyecto usa `@tailwindcss/vite` (Tailwind v4): **no hay `tailwind.config.ts`**.
Los tokens se declaran en `src/index.css` dentro del bloque `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-brand-dark:        #0a0a0a;
  --color-brand-dark-soft:   #111111;
  --color-brand-dark-mid:    #1a1a1a;
  --color-brand-light:       #ffffff;
  --color-brand-light-muted: #a3a3a3;
  --color-brand-accent:      #c9a96e;
  --color-brand-accent-dim:  #a8864f;
}
```

Después de agregar el `@theme`, Tailwind expone las clases:
`bg-brand-dark`, `text-brand-accent`, `border-brand-dark-mid`, etc.

## Tipografía

- **Display / Hero:** Peso 300–400, tamaño grande (4xl–7xl), tracking tight o normal
- **Body:** Peso 400, line-height relajado (leading-relaxed), color `brand-light-muted`
- **Labels / Tags:** Mayúsculas, tracking wide, tamaño xs–sm

Fuentes recomendadas: `Inter`, `DM Sans` o `Geist` (importar desde Google Fonts o self-hosted).

## Espaciado y layout

- Padding de sección: `py-24 md:py-32 lg:py-40`
- Max-width contenedor: `max-w-6xl mx-auto px-6 md:px-10`
- Gap en grillas: `gap-8 md:gap-12`
- Nunca usar espaciado hardcodeado con `style={{ margin: ... }}`

## Reglas de diseño

1. **Fondo siempre oscuro** — `bg-brand-dark` en `body`/`#root`
2. **Nunca usar colores fuera de la paleta** — prohibido hardcodear hex en JSX/TSX
3. **El acento dorado con moderación** — solo en elementos de alto foco (CTA, hover states, decoradores)
4. **Sombras sutiles** — `shadow-black/40` o `shadow-black/60`, nunca coloreadas
5. **Bordes casi invisibles** — `border border-brand-dark-mid` para delimitar cards

## Ejemplos de uso frecuente

```tsx
// Fondo de página
<main className="min-h-screen bg-brand-dark text-brand-light">

// Card elevada
<div className="bg-brand-dark-soft border border-brand-dark-mid rounded-2xl p-8">

// Botón primario (acento dorado)
<button className="bg-brand-accent text-brand-dark font-medium px-6 py-3 rounded-lg
                   hover:bg-brand-accent-dim transition-colors">

// Texto secundario
<p className="text-brand-light-muted text-sm leading-relaxed">

// Label decorativo
<span className="text-brand-accent text-xs uppercase tracking-widest">
```

## Integración con ui-ux-pro-max

Cuando uses la skill `ui-ux-pro-max`, especificá siempre:
- **Estilo:** `dark mode`, `minimalism` o `glassmorphism oscuro`
- **Paleta:** negro profundo + dorado arena (`#c9a96e`)
- **Stack:** `react` + `tailwindcss`
