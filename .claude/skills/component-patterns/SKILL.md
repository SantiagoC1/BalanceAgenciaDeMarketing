# Component Patterns — Balance

## Reglas base (no negociables)

1. **Named exports siempre** — nunca `export default`
2. **Props tipadas con `interface`** — nunca tipos inline ni `any`
3. **Animaciones solo con Framer Motion** — nunca `transition` CSS manual ni `@keyframes`
4. **Mobile-first** — clases base para móvil, luego `md:` y `lg:`

---

## Estructura de un componente de sección

Las secciones **reciben datos como props**, nunca fetchean solos.
El fetching ocurre en la página (o a través de `useConfig`) y baja como props.

```tsx
// src/components/sections/ServiciosSection.tsx
import { motion } from 'framer-motion';
import type { Servicio } from '../../lib/types';

interface ServiciosSectionProps {
  servicios: Servicio[];
}

export function ServiciosSection({ servicios }: ServiciosSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-brand-dark">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicios.map((s) => (
            <ServicioCard key={s.id} servicio={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## Framer Motion: variants + viewport

Siempre usar `variants` y `viewport={{ once: true }}` en secciones.
Nunca animar con `animate` directo cuando la animación es al entrar al viewport.

```tsx
// Variants estándar del proyecto
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Uso en JSX
<motion.ul
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item) => (
    <motion.li key={item.id} variants={itemVariants}>
      {/* contenido */}
    </motion.li>
  ))}
</motion.ul>
```

**Reglas de animación:**
- `viewport={{ once: true }}` — siempre; no reanimar en cada scroll
- `staggerChildren` en contenedores para efecto cascada (0.08–0.15 s)
- Duración base: 0.4–0.6 s con `ease: 'easeOut'`
- Solo animar `opacity` y `y` (o `x`); evitar `scale` salvo casos muy justificados

---

## Componente UI base (Button, Card, etc.)

```tsx
// src/components/ui/Button.tsx
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors';

  const variants = {
    primary: 'bg-brand-accent text-brand-dark hover:bg-brand-accent-dim',
    ghost:   'border border-brand-dark-mid text-brand-light hover:border-brand-accent hover:text-brand-accent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

---

## Hooks personalizados

Viven en `src/hooks/`. Siempre retornan un objeto tipado con interface.

```tsx
// Patrón estándar
interface UseAlgoReturn {
  data: Algo | null;
  loading: boolean;
  error: string | null;
}

export function useAlgo(): UseAlgoReturn {
  const [data, setData] = useState<Algo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ...lógica

  return { data, loading, error };
}
```

---

## Barrel exports (index.ts)

Cada carpeta de componentes tiene un `index.ts` que re-exporta todo:

```ts
// src/components/sections/index.ts
export { Hero }             from './Hero';
export { ServiciosSection } from './ServiciosSection';
export { PortfolioSection } from './PortfolioSection';
```

---

## Estructura de carpetas recordatorio

```
src/
├── components/
│   ├── ui/          # Button, Card, Section (base reutilizable)
│   ├── layout/      # Header, Footer, Layout
│   └── sections/    # Hero, ServiciosSection, PortfolioSection…
├── hooks/           # useConfig, useForm, etc.
├── lib/
│   ├── api.ts       # ÚNICO lugar con fetch()
│   └── types.ts     # Interfaces TypeScript globales
└── pages/           # Una página por ruta de React Router
```

---

## Anti-patrones prohibidos

| ❌ Prohibido | ✅ Correcto |
|---|---|
| `export default function Hero()` | `export function Hero()` |
| Props sin tipar o con `any` | `interface HeroProps { ... }` |
| `useState` + `fetch()` dentro de un componente de sección | Recibir datos como props |
| `transition: 'all 0.3s'` en CSS | `<motion.div whileHover={...}>` |
| Colores hardcodeados: `style={{ color: '#c9a96e' }}` | `className="text-brand-accent"` |
| `whileInView` sin `viewport={{ once: true }}` | Siempre `viewport={{ once: true }}` |
