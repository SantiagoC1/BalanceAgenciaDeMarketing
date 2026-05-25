// ─── Servicios ────────────────────────────────────────────────────────────────

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  icono?: string;
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

export interface ProyectoPortfolio {
  id: string;
  titulo: string;
  descripcion: string;
  imagen?: string;
  tags?: string[];
  url?: string;
}

// ─── Configuración global (Apps Script) ───────────────────────────────────────

export interface SiteConfig {
  nombre: string;
  slogan: string;
  email: string;
  telefono?: string;
  redesSociales?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  servicios: Servicio[];
  portfolio: ProyectoPortfolio[];
}

// ─── Lead ─────────────────────────────────────────────────────────────────────

export interface Lead {
  nombre:    string;
  email:     string;
  telefono?: string;
  mensaje:   string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
