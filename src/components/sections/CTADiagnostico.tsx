import { motion } from 'framer-motion';
import { useConfig } from '../../hooks/useConfig';
import { useTranslation } from '../../i18n/useTranslation';

/* ── Helpers de animación ────────────────────────────────────────────────── */

const fadeUp = (delay = 0) =>
  ({
    initial:     { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0  },
    viewport:    { once: true  },
    transition:  { duration: 0.6, ease: 'easeOut' as const, delay },
  }) as const;

/* ── Componente ──────────────────────────────────────────────────────────── */

export const CTADiagnostico = () => {
  const { config = {} } = useConfig()
  const { t } = useTranslation()

  return (
    <section className="relative bg-brand-black min-h-[70vh] flex items-center justify-center py-24 px-6 overflow-hidden text-center">

      {/* ── Texto fantasma "BALANCE" — efecto agencia ───────────────── */}
      <motion.span
        className="absolute inset-x-0 flex items-center justify-center font-display font-black text-white/[0.03] pointer-events-none select-none"
        style={{ fontSize: 'clamp(60px, 18vw, 240px)', letterSpacing: '-0.05em' }}
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        BALANCE
      </motion.span>

      {/* ── Contenido principal ──────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Pill label */}
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center font-display font-medium text-sm text-brand-violet bg-brand-violet/20 rounded-full px-4 py-1">
            {t('cta_pill')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...fadeUp(0.12)}
          className="mt-6 font-display leading-tight tracking-tight"
        >
          <span className="block font-normal text-4xl md:text-6xl text-brand-white">
            {t('cta_heading_1')}
          </span>
          <span className="block font-black text-4xl md:text-6xl text-brand-white">
            {t('cta_heading_2')}
          </span>
        </motion.h2>

        {/* Párrafo */}
        <motion.p
          {...fadeUp(0.24)}
          className="font-display text-lg text-white/50 max-w-md mx-auto mt-4"
        >
          {t('cta_paragraph')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.36)}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <motion.a
            href="#contacto"
            className="font-display font-bold text-brand-white bg-brand-violet px-8 py-4 rounded-full"
            whileHover={{ boxShadow: '0 8px 30px rgba(76,76,230,0.5)' }}
            transition={{ duration: 0.2 }}
          >
            {t('cta_primary')}
          </motion.a>
          <a
            href="#portfolio"
            className="
              font-display text-white/70 border border-white/20
              px-8 py-4 rounded-full
              hover:border-white/40 hover:text-white
              transition-colors duration-200
            "
          >
            {t('cta_secondary')}
          </a>
        </motion.div>

        {/* Micro stats */}
        <motion.div
          {...fadeUp(0.48)}
          className="flex items-center mt-16"
        >
          <div className="flex flex-col items-center">
            <span className="font-display font-black text-2xl text-brand-white leading-none">{t('cta_stat_diagnostico_value')}</span>
            <span className="font-display text-xs text-white/40 mt-1">{t('cta_stat_diagnostico_label')}</span>
          </div>

          <div className="w-px h-10 bg-white/10 mx-4 md:mx-8" aria-hidden="true" />

          <div className="flex flex-col items-center">
            <span className="font-display font-black text-2xl text-brand-white leading-none">
              + {config?.marcas || '30'}
            </span>
            <span className="font-display text-xs text-white/40 mt-1">{t('cta_stat_marcas_label')}</span>
          </div>

          <div className="w-px h-10 bg-white/10 mx-4 md:mx-8" aria-hidden="true" />

          <div className="flex flex-col items-center">
            <span className="font-display font-black text-2xl text-brand-white leading-none">{t('cta_stat_costo_value')}</span>
            <span className="font-display text-xs text-white/40 mt-1">{t('cta_stat_costo_label')}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
