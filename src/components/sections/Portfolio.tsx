import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import cruzDelSurVideo from '../../assets/videos/cruzDelSur.mp4';
import growVideo        from '../../assets/videos/grow.mp4';
import glowProVideo     from '../../assets/videos/glowPro.mp4';
import bocaditosVideo   from '../../assets/videos/bocaditos.mp4';

/* ── Tipos ───────────────────────────────────────────────────────────────── */

interface CasoPortfolio {
  id:          string;
  titulo:      string;
  cliente:     string;
  categorias:  readonly string[];
  video:       string;
  descripcion: string;
  numero:      string;
}

/* ── Datos ───────────────────────────────────────────────────────────────── */

const CASOS: CasoPortfolio[] = [
  {
    id:         'cruz-del-sur',
    titulo:     'Cruz del Sur',
    cliente:    'Consultorios Médicos',
    categorias: ['Arquitectura de marca', 'Estrategia digital'],
    video:      cruzDelSurVideo,
    numero:     '01',
    descripcion:
      'El desafío inicial fue transformar una comunicación fragmentada en una identidad ' +
      'institucional sólida. Nos encontramos con una marca que carecía de unidad visual. ' +
      'Nuestra intervención comenzó con la creación de una identidad visual que proyectara ' +
      'confianza y cercanía. Rediseñamos el ecosistema digital en Instagram bajo una narrativa ' +
      'coherente que entiende el ciclo del paciente, logrando humanizar la atención y generar ' +
      'un entorno de seguridad para la comunidad.',
  },
  {
    id:         'grow',
    titulo:     'Grow',
    cliente:    'Centro de Alto Rendimiento',
    categorias: ['Arquitectura de marca', 'Estrategia digital'],
    video:      growVideo,
    numero:     '02',
    descripcion:
      'Grow nació desde los cimientos con nuestra guía. Fuimos parte de la construcción de su ' +
      'identidad visual y diseñamos el sistema interno de la organización. El mayor reto fue la ' +
      'dualidad de su público: hablarle con autoridad al deportista de alto rendimiento sin ' +
      'descuidar al público general. Logramos un equilibrio entre la exigencia del rendimiento ' +
      'y la calidez de la rehabilitación.',
  },
  {
    id:         'glow-pro',
    titulo:     'Glow Pro',
    cliente:    'Marca de guantes para arqueros',
    categorias: ['Estrategia digital'],
    video:      glowProVideo,
    numero:     '03',
    descripcion:
      'Para esta marca argentina con proyección en Italia, el objetivo fue claro: dejar de vender ' +
      'guantes para empezar a vender autoridad en el arco. A través de una narrativa técnica pero ' +
      'emocionante, posicionamos a Glow Pro como un referente de calidad y diseño internacional, ' +
      'manteniendo viva la raíz y la garra del arquero sudamericano.',
  },
  {
    id:         'bocaditos',
    titulo:     'Bocaditos',
    cliente:    'Coffee & Culture · USA',
    categorias: ['Estrategia digital'],
    video:      bocaditosVideo,
    numero:     '04',
    descripcion:
      'Llevar la esencia argentina al mercado estadounidense requiere más que traducir un menú; ' +
      'requiere transmitir una emoción. Nuestra estrategia se centró en la identidad y la ' +
      'estacionalidad, capturando la nostalgia y la alegría del reencuentro. Logramos que la ' +
      'cafetería fuera un espacio de pertenencia donde la cultura argentina se vive y se celebra ' +
      'en cada detalle visual.',
  },
];

/* ── PortfolioModal ──────────────────────────────────────────────────────── */

interface PortfolioModalProps {
  caso:    CasoPortfolio;
  onClose: () => void;
}

const PortfolioModal = ({ caso, onClose }: PortfolioModalProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="
          bg-brand-white max-w-4xl w-full
          rounded-2xl overflow-hidden relative
          max-h-[90vh]
          flex flex-col md:grid md:grid-cols-[2fr_3fr]
        "
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        exit={{    scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' as const }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Columna izquierda: video vertical ──────────────────────── */}
        <div className="bg-brand-black relative h-[45vh] md:h-auto md:min-h-[400px] overflow-hidden flex-shrink-0">
          <video
            key={caso.id}
            src={caso.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Botón cerrar — flota sobre el video en ambos breakpoints */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="
              absolute top-3 right-3 z-10
              w-8 h-8 flex items-center justify-center
              bg-black/40 hover:bg-black/60
              rounded-full transition-colors duration-150
              text-white
            "
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>

        {/* ── Columna derecha: descripción ───────────────────────────── */}
        <div className="relative bg-white overflow-y-auto p-6 md:p-10 flex-1 min-h-0">

          {/* Pills de categoría */}
          <div className="flex flex-wrap gap-1.5">
            {caso.categorias.map((cat) => (
              <span
                key={cat}
                className="
                  font-display font-medium text-xs
                  bg-brand-violet/10 text-brand-violet
                  rounded-full px-2.5 py-0.5
                "
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Título */}
          <h3 className="font-display font-black text-brand-black text-2xl md:text-3xl tracking-tight mt-3">
            {caso.titulo}
          </h3>

          {/* Cliente */}
          <p className="font-display text-sm text-brand-black/50 mt-1">
            {caso.cliente}
          </p>

          {/* Separador */}
          <div className="w-8 h-px bg-brand-violet mt-6 mb-6" aria-hidden="true" />

          {/* Descripción */}
          <p className="font-display font-normal text-base text-brand-black/70 leading-relaxed">
            {caso.descripcion}
          </p>

          {/* CTA Behance */}
          <a
            href="https://www.behance.net/balancegroup"
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-display font-medium text-brand-violet
              hover:underline underline-offset-4
              transition-colors duration-200
              mt-8 block
            "
          >
            Ver en Behance →
          </a>

        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Portfolio (export) ──────────────────────────────────────────────────── */

export const Portfolio = () => {
  const [hoveredId,   setHoveredId]   = useState<string | null>(null);
  const [cursorPos,   setCursorPos]   = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedCaso, setSelectedCaso] = useState<CasoPortfolio | null>(null);

  /* ── Cursor tracking ───────────────────────────────────────────── */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  /* ── Modal ─────────────────────────────────────────────────────── */
  const handleSelect = useCallback((caso: CasoPortfolio) => {
    setSelectedCaso(caso);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCaso(null);
  }, []);

  const hoveredCaso = CASOS.find((c) => c.id === hoveredId) ?? null;

  return (
    <>
      <section
        id="portfolio"
        className="bg-brand-white w-full scroll-mt-16 md:scroll-mt-20 py-24"
        onMouseMove={handleMouseMove}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* ── Header ─────────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
            <div className="flex flex-col gap-3">
              <span className="font-display font-medium text-sm text-brand-violet tracking-widest uppercase">
                Nuestro Trabajo
              </span>
              <h2 className="font-display font-black text-5xl text-brand-black leading-tight tracking-tight">
                Casos que{' '}
                <span className="font-script font-bold text-brand-violet">hablan</span>
              </h2>
            </div>
            <p className="hidden md:block font-display text-sm text-brand-black/40 pb-1">
              4 marcas transformadas
            </p>
          </div>

          {/* ── Lista editorial ────────────────────────────────────── */}
          <ul className="w-full" role="list">
            {CASOS.map((caso, i) => (
              <li
                key={caso.id}
                role="listitem"
                onMouseEnter={() => setHoveredId(caso.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleSelect(caso)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(caso); }}
                tabIndex={0}
                aria-label={`Ver caso: ${caso.titulo} — ${caso.cliente}`}
                className={[
                  'group flex items-center justify-between gap-6',
                  'border-b border-brand-black/10 py-8',
                  i === 0 ? 'border-t' : '',
                  'cursor-pointer md:cursor-none',
                  'transition-colors duration-200',
                  hoveredId === caso.id
                    ? 'text-brand-violet'
                    : 'text-brand-black',
                ].join(' ')}
              >
                {/* Número — oculto en mobile */}
                <span
                  className={[
                    'hidden md:inline font-display font-medium text-sm shrink-0 w-8 tabular-nums transition-colors duration-200',
                    hoveredId === caso.id ? 'text-brand-violet/60' : 'text-brand-black/30',
                  ].join(' ')}
                >
                  {caso.numero}
                </span>

                {/* Título + categorías */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={[
                      'font-display font-black text-2xl md:text-4xl tracking-tight leading-tight transition-colors duration-200',
                      hoveredId === caso.id ? 'text-brand-violet' : 'text-brand-black',
                    ].join(' ')}
                  >
                    {caso.titulo}
                  </h3>
                  <p
                    className={[
                      'font-display text-sm mt-1 transition-colors duration-200',
                      hoveredId === caso.id ? 'text-brand-violet/60' : 'text-brand-black/45',
                    ].join(' ')}
                  >
                    {caso.cliente}
                  </p>
                </div>

                {/* Categorías (desktop) */}
                <div className="hidden md:flex flex-wrap gap-1.5 shrink-0">
                  {caso.categorias.map((cat) => (
                    <span
                      key={cat}
                      className={[
                        'font-display font-medium text-xs rounded-full px-2.5 py-0.5 transition-colors duration-200',
                        hoveredId === caso.id
                          ? 'bg-brand-violet text-brand-white'
                          : 'bg-brand-black/8 text-brand-black/60',
                      ].join(' ')}
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Flecha */}
                <span
                  className={[
                    'shrink-0 text-xl md:text-2xl transition-all duration-300',
                    hoveredId === caso.id
                      ? 'text-brand-violet translate-x-1'
                      : 'text-brand-black/25',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  →
                </span>
              </li>
            ))}
          </ul>

        </div>
      </section>

      {/* ── Preview flotante + cursor custom (solo desktop) ────────────── */}
      <div className="hidden md:block" aria-hidden="true">

        {/* Video preview que sigue al cursor */}
        <div
          className="fixed top-0 left-0 z-40 pointer-events-none"
          style={{
            transform: `translate(${cursorPos.x + 24}px, calc(${cursorPos.y}px - 50%))`,
          }}
        >
          <AnimatePresence>
            {hoveredCaso !== null && (
              <motion.div
                key={hoveredCaso.id}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1   }}
                exit={{   opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.2, ease: 'easeOut' as const }}
                className="w-40 h-72 rounded-xl overflow-hidden shadow-2xl"
              >
                <video
                  src={hoveredCaso.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cursor circular "VER" */}
        <div
          className="fixed top-0 left-0 z-50 pointer-events-none"
          style={{
            transform: `translate(calc(${cursorPos.x}px - 50%), calc(${cursorPos.y}px - 50%))`,
          }}
        >
          <AnimatePresence>
            {hoveredId !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1   }}
                exit={{   opacity: 0, scale: 0.5  }}
                transition={{ duration: 0.15, ease: 'easeOut' as const }}
                className="
                  w-14 h-14 rounded-full
                  bg-brand-violet
                  flex items-center justify-center
                "
              >
                <span className="font-display font-bold text-xs text-brand-white tracking-wider">
                  VER
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedCaso !== null && (
          <PortfolioModal
            key={selectedCaso.id}
            caso={selectedCaso}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
};
