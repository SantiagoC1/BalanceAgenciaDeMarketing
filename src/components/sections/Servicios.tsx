import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/* ── Tipos ───────────────────────────────────────────────────────────────── */

interface Servicio {
  id:          string;
  numero:      string;
  titulo:      string;
  descripcion: string;
  keywords:    readonly string[];
}

/* ── Datos ───────────────────────────────────────────────────────────────── */

const SERVICIOS: Servicio[] = [
  {
    id:          'contenidos',
    numero:      '01',
    titulo:      'Gestión y estrategias de contenidos digitales',
    descripcion:
      'No sólo gestionamos perfiles, construimos autoridad. Este servicio integra la ' +
      'planificación estratégica, la producción y edición de contenido para lograr que ' +
      'tu marca tenga una identidad clara y un vínculo genuino con su audiencia, ' +
      'asegurando que tu mensaje sea coherente en cada historia y publicación.',
    keywords: ['Planificación estratégica', 'Producción de contenido', 'Métricas'],
  },
  {
    id:          'marca',
    numero:      '02',
    titulo:      'Arquitectura de marca',
    descripcion:
      'Definimos la esencia que hace que tu marca sea única y memorable. Creamos un ' +
      'sistema visual completo (logo, tipografías, paleta de color y elementos gráficos) ' +
      'y establecemos el tono y la voz de la marca. Entregamos un manual de identidad ' +
      'integral que garantiza coherencia en cada punto de contacto.',
    keywords: ['Identidad visual', 'Manual de marca', 'Logo & tipografía'],
  },
  {
    id:          'consultoria',
    numero:      '03',
    titulo:      'Consultorías y mentoría de impacto',
    descripcion:
      'Diseñamos una hoja de ruta integral que se adapta a tu estructura actual. A ' +
      'través de diagnósticos de percepción y sesiones de mentoría, transformamos tu ' +
      'visión en un sistema de trabajo coherente, humano y autónomo.',
    keywords: ['Diagnóstico de marca', 'Mentoría', 'Estrategia de crecimiento'],
  },
];

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
  const [openId, setOpenId] = useState<string>(SERVICIOS[0].id);

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? '' : id));
  };

  return (
    <section id="servicios" className="bg-brand-white py-24 px-6 scroll-mt-16 md:scroll-mt-20">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-16">
          <span className="font-display font-medium text-xs text-brand-green tracking-widest uppercase">
            SERVICIOS
          </span>
          <h2 className="font-display font-black text-5xl md:text-6xl text-brand-black leading-tight tracking-tight mt-3">
            Todo lo que necesitás{' '}
            <span className="font-script font-bold text-brand-violet">
              para crecer
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
          {SERVICIOS.map((servicio) => {
            const isOpen = openId === servicio.id;

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
                  {/* Número decorativo — más compacto en mobile */}
                  <span className="font-display font-black text-3xl md:text-5xl text-brand-violet/30 w-10 md:w-16 flex-shrink-0 leading-none select-none tabular-nums">
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
                    className="flex-shrink-0 text-brand-black/40 group-hover:text-brand-violet transition-colors duration-200"
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
                              className="
                                font-display font-medium text-xs
                                text-brand-violet bg-brand-violet/10
                                rounded-full px-3 py-1
                              "
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
          })}
        </motion.div>

      </div>
    </section>
  );
};
