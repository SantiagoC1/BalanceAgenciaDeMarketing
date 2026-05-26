import { motion, type Variants } from 'framer-motion';
import videoHero from '../../assets/videos/videoHero.mp4';

/* ── Animation variants ──────────────────────────────────────────────────── */

/** Contenedor izquierdo: staggers los hijos automáticamente */
const leftContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren:   0.08,
    },
  },
};

/** Cada hijo del contenedor izquierdo */
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};


/* ── Componente ──────────────────────────────────────────────────────────── */

export const Hero = () => {
  return (
    <section className="bg-brand-white w-full relative overflow-hidden" aria-label="Inicio">

      {/* ── Fondo decorativo ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Dot grid sutil */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--color-brand-violet) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Gradiente diagonal top-right → bottom-left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(76,76,230,0.05) 0%, transparent 60%)',
          }}
        />
        {/* Blob 1 — violet, arriba derecha
            Nota: usamos style inline para garantizar el color.
            bg-brand-violet/8 en Tailwind v4 genera color-mix() al 8%,
            y combinado con opacity:[0.5,0.8,0.5] da 4% visible → invisible.
            Temporalmente subido a 0.20 para debug.                       */}
        <motion.div
          className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(76, 76, 230, 0.20)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        {/* Blob 2 — green, abajo izquierda */}
        <motion.div
          className="absolute bottom-0 left-20 w-[300px] h-[300px] rounded-full blur-[80px]"
          style={{ backgroundColor: 'rgba(171, 198, 82, 0.12)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          aria-hidden="true"
        />
      </div>

      <div
        className="
          relative z-10
          max-w-6xl mx-auto px-6 md:px-10
          grid grid-cols-1 md:grid-cols-[3fr_2fr]
          items-center
          gap-12 md:gap-16
          pt-8 pb-16 md:py-0
          md:min-h-[90vh]
        "
      >

        {/* ── Columna izquierda: texto ──────────────────────────────── */}
        <motion.div
          variants={leftContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8"
        >

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="
              font-display font-black
              leading-[1.04] tracking-tight
            "
          >
            {/* Línea 1 */}
            <span className="block text-4xl md:text-7xl text-brand-black">
              Comunicación y Marketing
            </span>

            {/* Línea 2: "para" DM Sans + "marcas y líderes" Dancing Script */}
            <span className="block text-4xl md:text-7xl text-brand-black mt-1">
              para{' '}
              <span className="font-script font-bold text-brand-violet">
                marcas y líderes
              </span>
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={fadeUp}
            className="
              font-display font-normal text-lg
              leading-relaxed text-brand-black/70
              max-w-md
            "
          >
            Somos el balance entre la{' '}
            <span className="text-brand-green font-medium">creatividad</span>
            {' '}y la{' '}
            <span className="text-brand-violet font-medium">estrategia</span>
            {' '}que tu marca necesita para construir una identidad
            que conecte de forma real.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primario */}
            <motion.div
              className="rounded-md"
              whileHover={{ boxShadow: '0 8px 20px rgba(76,76,230,0.35)' }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="#contacto"
                className="
                  inline-flex items-center
                  font-display font-bold text-sm
                  bg-brand-violet text-brand-white
                  rounded-md px-6 py-3.5
                  transition-colors duration-200
                  hover:bg-brand-violet/90
                "
              >
                Hacer diagnóstico
              </a>
            </motion.div>

            {/* Secundario */}
            <a
              href="#portfolio"
              className="
                inline-flex items-center gap-1.5
                font-display font-medium text-sm
                text-brand-violet
                hover:underline underline-offset-4
                transition-all duration-200
              "
            >
              Ver portfolio
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>

        </motion.div>

        {/* ── Columna derecha: visual ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.22 }}
          className="relative flex flex-col items-center gap-6"
        >

          {/* Tag pill */}
          <div className="self-end">
            <span className="font-display font-medium text-xs bg-brand-violet/10 text-brand-violet px-4 py-2 rounded-full">
              Agencia de Marketing
            </span>
          </div>

          {/* Video */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl">
            <video
              src={videoHero}
              autoPlay
              muted
              loop
              playsInline
              className="w-full object-cover"
              style={{
                aspectRatio: '3/4',
                display: 'block',
              }}
            />
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 self-start">
            <div>
              <p className="font-display font-black text-3xl text-brand-black">100+</p>
              <p className="font-display text-sm text-brand-black/50">marcas</p>
            </div>
            <div className="w-px h-8 bg-brand-gray" />
            <div>
              <p className="font-display font-black text-3xl text-brand-black">5</p>
              <p className="font-display text-sm text-brand-black/50">años de experiencia</p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
