import { motion, type Variants } from 'framer-motion';
import piliFoto  from '../../assets/images/Pili.png';
import pachiFoto from '../../assets/images/Pachi.png';

/* ── Animation variants ──────────────────────────────────────────────────── */

const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

const slideRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const, delay: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: 0.4 },
  },
};

const pillsContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};

const pillItem: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

/* ── Datos ───────────────────────────────────────────────────────────────── */

const PILLS = [
  { label: 'Comunicación estratégica', accent: false },
  { label: 'Identidad memorable',      accent: true  },
  { label: 'Contenido con impacto',    accent: false },
] as const;

/* ── Componente ──────────────────────────────────────────────────────────── */

export const SobreNosotras = () => {
  return (
    <section id="nosotras" className="bg-brand-black w-full scroll-mt-16 md:scroll-mt-20" aria-label="Sobre nosotras">

      {/* ── MOBILE: fotos circulares (< md) ──────────────────────────────── */}
      <div className="md:hidden flex flex-col items-center pt-16 pb-8 px-6 text-center">

        {/* Etiqueta + título */}
        <span className="font-display font-medium text-sm text-brand-green tracking-widest uppercase">
          Sobre Nosotras
        </span>
        <h2 className="font-display font-black text-5xl text-brand-white leading-tight tracking-tight mt-4">
          Hola!{' '}
          <span className="font-script font-bold text-brand-violet">
            somos
          </span>
        </h2>

        {/* Fotos circulares superpuestas */}
        <div className="flex flex-col items-center mt-10">
          <motion.img
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            src={piliFoto}
            alt="Pili, co-fundadora de Balance"
            className="w-48 h-48 object-cover object-top rounded-full"
          />
          <motion.img
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            src={pachiFoto}
            alt="Pachi, co-fundadora de Balance"
            className="w-40 h-40 object-cover object-top rounded-full -mt-8"
          />
        </div>

        {/* Nombres */}
        <div className="flex gap-12 mt-6">
          <div>
            <p className="font-display font-black text-brand-white text-base">Pili</p>
            <p className="font-display text-xs text-brand-white/60 mt-0.5">Co-fundadora</p>
          </div>
          <div>
            <p className="font-display font-black text-brand-white text-base">Pachi</p>
            <p className="font-display text-xs text-brand-white/60 mt-0.5">Co-fundadora</p>
          </div>
        </div>

      </div>

      {/* ── DESKTOP: fotos full-width en grid (≥ md) ─────────────────────── */}
      <div className="hidden md:grid grid-cols-2 relative min-h-screen overflow-hidden">

        {/* ── Mitad izquierda — Pili ───────────────────────────────────── */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          <img
            src={piliFoto}
            alt="Pili, co-fundadora de Balance — agencia de marketing argentina"
            width={600}
            height={750}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />

          {/* Fade derecho — funde hacia el centro */}
          <div
            className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, var(--color-brand-black), transparent)',
            }}
          />

          {/* Fade inferior */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: '35%',
              background: 'linear-gradient(to bottom, transparent, var(--color-brand-black))',
            }}
          />

          {/* Nombre — bottom-left */}
          <div className="absolute bottom-10 left-8 z-10">
            <p className="font-display font-black text-brand-white text-2xl tracking-tight">
              Pili
            </p>
            <p className="font-display text-sm text-brand-white/60 mt-0.5">
              Co-fundadora
            </p>
          </div>
        </motion.div>

        {/* ── Mitad derecha — Pachi ────────────────────────────────────── */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          <img
            src={pachiFoto}
            alt="Pachi, co-fundadora de Balance — agencia de marketing argentina"
            width={600}
            height={750}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />

          {/* Fade izquierdo — funde hacia el centro */}
          <div
            className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, var(--color-brand-black), transparent)',
            }}
          />

          {/* Fade inferior */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: '35%',
              background: 'linear-gradient(to bottom, transparent, var(--color-brand-black))',
            }}
          />

          {/* Nombre — bottom-right */}
          <div className="absolute bottom-10 right-8 z-10 text-right">
            <p className="font-display font-black text-brand-white text-2xl tracking-tight">
              Pachi
            </p>
            <p className="font-display text-sm text-brand-white/60 mt-0.5">
              Co-fundadora
            </p>
          </div>
        </motion.div>

        {/* ── Overlay central desktop ──────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            z-20 flex flex-col items-center gap-4
            pointer-events-none
          "
        >
          <span className="font-display font-medium text-sm text-brand-green tracking-widest uppercase">
            Sobre Nosotras
          </span>
          <h2 className="font-display font-black text-6xl text-brand-white leading-tight tracking-tight text-center whitespace-nowrap">
            Hola!{' '}
            <span className="font-script font-bold text-brand-violet">
              somos
            </span>
          </h2>
          {/* Separador vertical */}
          <div className="w-px h-16 bg-brand-violet/50" />
        </motion.div>

      </div>

      {/* ── Bloque de texto inferior ─────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col items-center gap-8 text-center">

        <p className="font-display font-normal text-xl md:text-2xl text-brand-white/75 leading-relaxed">
          Somos el balance entre la creatividad y la estrategia que tu marca
          necesita para construir una identidad que conecte de forma real.
        </p>

        {/* Pills */}
        <motion.div
          variants={pillsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {PILLS.map((pill) => (
            <motion.span
              key={pill.label}
              variants={pillItem}
              className={[
                'font-display font-medium text-sm rounded-full px-5 py-2',
                pill.accent
                  ? 'bg-brand-violet text-brand-white'
                  : 'bg-white/10 text-brand-white/80',
              ].join(' ')}
            >
              {pill.label}
            </motion.span>
          ))}
        </motion.div>

        

      </div>
    </section>
  );
};
