const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string;

/**
 * Envía un lead al Apps Script.
 * Usa Content-Type: text/plain para evitar el CORS preflight
 * que Apps Script rechaza con application/json.
 */
export async function submitLead(data: {
  nombre:    string;
  email:     string;
  telefono?: string;
  mensaje:   string;
}): Promise<{ ok: boolean }> {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'text/plain' },
      body:    JSON.stringify(data),
    });
    const result = await response.json() as { ok: boolean };
    return { ok: result.ok === true };
  } catch {
    return { ok: false };
  }
}

/**
 * Obtiene la configuración del sitio desde el Apps Script.
 */
export async function getConfig(): Promise<{
  config:    Record<string, string>;
  servicios: Record<string, string>[];
  portfolio: Record<string, string>[];
} | null> {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?action=config`);
    const data = await response.json() as {
      config:    Record<string, string>;
      servicios: Record<string, string>[];
      portfolio: Record<string, string>[];
    };
    return data;
  } catch {
    return null;
  }
}
