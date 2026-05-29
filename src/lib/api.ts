import type { SiteConfig, ApiResponse } from './types';

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string;

/**
 * Envía un lead al Apps Script.
 * Usa mode: 'no-cors' porque Apps Script no devuelve los headers
 * CORS necesarios para leer la respuesta desde el navegador.
 * Con no-cors la response es opaque — no se puede leer el body,
 * pero si fetch no lanza un error de red el dato llegó al Sheet.
 */
export async function submitLead(data: Record<string, string>): Promise<{ ok: boolean }> {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'text/plain' },
      body:    JSON.stringify(data),
      mode:    'no-cors',
    });
    // Con no-cors no podemos leer la respuesta, pero si no hubo
    // error de red asumimos que Apps Script recibió el dato.
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

/**
 * Obtiene la configuración del sitio desde el Apps Script.
 */
export async function getConfig(): Promise<{
  config:     Record<string, string>;
  servicios:  Record<string, string>[];
  portfolio:  Record<string, string>[];
  formConfig: Record<string, string>;
} | null> {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?action=config`);
    const data = await response.json() as {
      config:     Record<string, string>;
      servicios:  Record<string, string>[];
      portfolio:  Record<string, string>[];
      formConfig: Record<string, string>;
    };
    return data;
  } catch {
    return null;
  }
}

/**
 * Obtiene y mapea la configuración completa del sitio como SiteConfig tipado.
 * Wrapper sobre getConfig() que devuelve ApiResponse<SiteConfig>.
 */
export async function fetchSiteConfig(): Promise<ApiResponse<SiteConfig>> {
  try {
    const raw = await getConfig();

    if (!raw) {
      return { ok: false, error: 'No se pudo obtener la configuración' };
    }

    const config: SiteConfig = {
      nombre:   raw.config['nombre']  ?? '',
      slogan:   raw.config['slogan']  ?? '',
      email:    raw.config['email']   ?? '',
      telefono: raw.config['telefono'],
      redesSociales: {
        instagram: raw.config['instagram'],
        linkedin:  raw.config['linkedin'],
        twitter:   raw.config['twitter'],
      },
      servicios: raw.servicios.map(s => ({
        id:          s['id']          ?? '',
        titulo:      s['titulo']      ?? '',
        descripcion: s['descripcion'] ?? '',
        icono:       s['icono'],
      })),
      portfolio: raw.portfolio.map(p => ({
        id:          p['id']          ?? '',
        titulo:      p['titulo']      ?? '',
        descripcion: p['descripcion'] ?? '',
        imagen:      p['imagen'],
        tags:        p['tags'] ? p['tags'].split(',').map(t => t.trim()) : undefined,
        url:         p['url'],
      })),
    };

    return { ok: true, data: config };
  } catch {
    return { ok: false, error: 'Error al cargar la configuración' };
  }
}
