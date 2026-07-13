import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import type { ServicioTexto } from '../../i18n/translations';

/* ── Tipos ───────────────────────────────────────────────────────────────── */

type Servicio = ServicioTexto;

/* ── Animation variants ──────────────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

/* ── Componente ──────────────────────────────────────────────────────────── */

export const Servicios = () => {
  const { t, servicios } = useTranslation();
  const serviciosBalance = servicios.filter(s => s.variant !== 'scdev');
  const serviciosScdev   = servicios.filter(s => s.variant === 'scdev');
  const [openId, setOpenId] = useState<string>(serviciosBalance[0].id);

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? '' : id));
  };

  const renderItem = (servicio: Servicio) => {
    const isOpen  = openId === servicio.id;
    const isScdev = servicio.variant === 'scdev';

    return (
      <motion.div
        key={servicio.id}
        variants={itemVariants}
        className="border-b border-brand-black/10"
      >
        {/* ── Fila clickeable ───────────────────────────────── */}
        <button
          type="button"
          onClick={() => toggle(servicio.id)}
          className="w-full flex items-center gap-4 md:gap-6 py-8 text-left group cursor-pointer"
          aria-expanded={isOpen}
        >
          {/* Número decorativo */}
          <span className={`font-display font-black text-3xl md:text-5xl w-10 md:w-16 flex-shrink-0 leading-none select-none tabular-nums ${isScdev ? 'text-brand-green/40' : 'text-brand-violet/30'}`}>
            {servicio.numero}
          </span>

          {/* Título */}
          <span className="font-display font-black text-xl md:text-3xl text-brand-black flex-1 leading-tight">
            {servicio.titulo}
          </span>

          {/* Ícono expand/collapse */}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`flex-shrink-0 text-brand-black/40 transition-colors duration-200 ${isScdev ? 'group-hover:text-brand-green' : 'group-hover:text-brand-violet'}`}
          >
            <ChevronDown size={22} aria-hidden="true" />
          </motion.span>
        </button>

        {/* ── Contenido expandible ──────────────────────────── */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height:  { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.25, ease: 'easeOut' },
              }}
              className="overflow-hidden"
            >
              <div className="pb-8 pl-0 md:pl-[88px]">
                <p className="font-display font-normal text-base text-brand-black/65 leading-relaxed max-w-2xl mb-4">
                  {servicio.descripcion}
                </p>
                <div className="flex flex-wrap gap-2">
                  {servicio.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className={`font-display font-medium text-xs rounded-full px-3 py-1 ${isScdev ? 'text-brand-green bg-brand-green/10' : 'text-brand-violet bg-brand-violet/10'}`}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    );
  };

  return (
    <section id="servicios" className="bg-brand-white py-24 px-6 scroll-mt-16 md:scroll-mt-20" aria-label={t('services_aria_label')}>
      <div className="max-w-6xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-16">
          <span className="font-display font-medium text-xs text-brand-green tracking-widest uppercase">
            {t('services_label')}
          </span>
          <h2 className="font-display font-black text-5xl md:text-6xl text-brand-black leading-tight tracking-tight mt-3">
            {t('services_heading_pre')}{' '}
            <span className="font-script font-bold text-brand-violet">
              {t('services_heading_script')}
            </span>
          </h2>
        </div>

        {/* ── Acordeón ────────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col"
        >
          {serviciosBalance.map(renderItem)}

          {/* ── Divisor SCdev ─────────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 my-2">
            <span className="flex-1 h-px bg-brand-green/30" />
            <span className="text-brand-green text-sm font-black tracking-widest uppercase whitespace-nowrap">
              {t('services_divider')}
            </span>
            <span className="flex-1 h-px bg-brand-green/30" />
          </motion.div>

          {serviciosScdev.map(renderItem)}
        </motion.div>

      </div>
    </section>
  );
};
