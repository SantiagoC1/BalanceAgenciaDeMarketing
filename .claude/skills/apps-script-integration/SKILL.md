# Apps Script Integration — Balance

## Arquitectura general

```
Google Sheets  ←→  Google Apps Script  ←→  VITE_APPS_SCRIPT_URL
                                                    ↕
                                              src/lib/api.ts   ← ÚNICO punto de fetch
                                                    ↕
                                            src/hooks/useConfig.ts  ← centraliza el GET
                                                    ↕
                                           Páginas / Componentes
```

**Regla de oro:** `fetch()` solo existe en `src/lib/api.ts`. Nunca llamar fetch desde hooks, componentes ni páginas directamente.

---

## Variable de entorno

```ts
// Leer siempre así — nunca hardcodear la URL
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string;
```

Definir en `.env`:
```
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

> `.env` va en `.gitignore`. Compartir la URL por fuera del repo.

---

## Endpoint GET — `?action=config`

Devuelve la configuración completa del sitio:

```ts
// Respuesta del Apps Script (GET ?action=config)
{
  nombre: string;
  slogan: string;
  email: string;
  telefono?: string;
  redesSociales?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  servicios: Array<{
    id: string;
    titulo: string;
    descripcion: string;
    icono?: string;
  }>;
  portfolio: Array<{
    id: string;
    titulo: string;
    descripcion: string;
    imagen?: string;
    tags?: string[];
    url?: string;
  }>;
}
```

---

## `src/lib/api.ts` — función GET

```ts
import type { SiteConfig, ApiResponse } from './types';

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string;

export async function fetchSiteConfig(): Promise<ApiResponse<SiteConfig>> {
  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?action=config`);

    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}: ${res.statusText}` };
    }

    const data: SiteConfig = await res.json();
    return { ok: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    return { ok: false, error: message };
  }
}
```

## `src/lib/api.ts` — función POST (formulario)

```ts
interface FormData {
  nombre: string;
  email: string;
  mensaje: string;
}

export async function submitContactForm(
  formData: FormData
): Promise<ApiResponse<{ mensaje: string }>> {
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'contacto', ...formData }),
    });

    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}: ${res.statusText}` };
    }

    const data = await res.json();
    return { ok: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al enviar';
    return { ok: false, error: message };
  }
}
```

> ⚠️ Apps Script con `doPost` requiere que el script esté publicado como **"Cualquiera"** y en modo **"Ejecutar como: yo"**. CORS puede requerir `mode: 'no-cors'` — en ese caso no se puede leer la respuesta (solo confirmar el envío).

---

## `src/hooks/useConfig.ts` — hook de GET

Centraliza el GET, evita que cada componente fetchee por su cuenta:

```ts
import { useState, useEffect } from 'react';
import { fetchSiteConfig } from '../lib/api';
import type { SiteConfig } from '../lib/types';

interface UseConfigReturn {
  config: SiteConfig | null;
  loading: boolean;
  error: string | null;
}

export function useConfig(): UseConfigReturn {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const result = await fetchSiteConfig();

      if (cancelled) return;

      if (result.ok) {
        setConfig(result.data);
      } else {
        setError(result.error);
      }

      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { config, loading, error };
}
```

---

## Uso en una página

```tsx
// src/pages/Home.tsx
import { useConfig } from '../hooks/useConfig';
import { ServiciosSection } from '../components/sections';
import { PortfolioSection } from '../components/sections';

export function HomePage() {
  const { config, loading, error } = useConfig();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <span className="text-brand-light-muted animate-pulse">Cargando…</span>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <p className="text-red-400">Error al cargar el sitio. Intentá más tarde.</p>
      </div>
    );
  }

  return (
    <main className="bg-brand-dark text-brand-light">
      <ServiciosSection servicios={config.servicios} />
      <PortfolioSection proyectos={config.portfolio} />
    </main>
  );
}
```

---

## Estados obligatorios

Todo componente o página que dependa de datos del Apps Script **debe** manejar los tres estados:

| Estado | Qué mostrar |
|--------|-------------|
| `loading: true` | Skeleton, spinner o texto "Cargando…" con `animate-pulse` |
| `error: string` | Mensaje de error legible para el usuario |
| `data` disponible | Contenido real |

Nunca renderizar la UI final con `config` potencialmente `null` sin el guard de loading/error primero.

---

## Anti-patrones prohibidos

| ❌ Prohibido | ✅ Correcto |
|---|---|
| `fetch(url)` dentro de un componente | Solo en `src/lib/api.ts` |
| URL hardcodeada: `fetch('https://script.google.com/...')` | `import.meta.env.VITE_APPS_SCRIPT_URL` |
| Ignorar el estado `loading` | Siempre mostrar feedback al usuario |
| Ignorar el estado `error` | Siempre mostrar mensaje de error |
| Múltiples hooks que fetchean la config | Un solo `useConfig` en la página raíz |
