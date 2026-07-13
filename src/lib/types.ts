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

export type ServicioRama = 'web' | 'marketing' | 'ambos';

export interface Lead {
  nombre:          string;
  marca:           string;
  email:           string;
  telefono?:       string;
  productos:       string;
  comoVende:       string;
  porqueContratar?: string;
  objetivos?:      string;
  servicioInteres?: string;
  materialVisual?: string;
  inversion:       string;
  comentarios?:    string;

  servicioRama:      ServicioRama;
  sitioActual?:      string;
  identidadVisual?:  string;
  tipoSitio?:        string;
  objetivoSitio?:    string;
  redesActuales?:    string;
  comoNosConociste:  string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
