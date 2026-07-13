import { motion } from 'framer-motion';
import santiagoFoto from '../../assets/images/Santiago.png';
import piliFoto    from '../../assets/images/Pili.png';
import pachiFoto   from '../../assets/images/Pachi.png';
import { useTranslation } from '../../i18n/useTranslation';

/* ── Tipos ───────────────────────────────────────────────────────────────── */

interface Miembro {
  foto:         string;
  nombre:       string;
  rolKey:       string;
  pillKey:      string;
  pillClass:    string;
  blendMode?:   boolean;
  altKey:       string;
  overlayBase:  string;
  overlayHover: string;
}

/* ── Datos ───────────────────────────────────────────────────────────────── */

const VIOLET_BASE  = 'linear-gradient(to top, rgba(76,76,230,0.85) 0%, rgba(76,76,230,0) 60%)';
const VIOLET_HOVER = 'linear-gradient(to top, rgba(76,76,230,0.95) 0%, rgba(76,76,230,0) 60%)';
const GREEN_BASE   = 'linear-gradient(to top, rgba(171,198,82,0.85) 0%, rgba(171,198,82,0) 60%)';
const GREEN_HOVER  = 'linear-gradient(to top, rgba(171,198,82,0.95) 0%, rgba(171,198,82,0) 60%)';

const EQUIPO: Miembro[] = [
  {
    foto:         piliFoto,
    nombre:       'Pili',
    rolKey:       'team_pili_rol',
    pillKey:      'team_pili_pill',
    pillClass:    'bg-brand-green',
    blendMode:    true,
    altKey:       'team_pili_alt',
    overlayBase:  VIOLET_BASE,
    overlayHover: VIOLET_HOVER,
  },
  {
    foto:         pachiFoto,
    nombre:       'Pachi',
    rolKey:       'team_pachi_rol',
    pillKey:      'team_pachi_pill',
    pillClass:    'bg-brand-violet/80',
    blendMode:    true,
    altKey:       'team_pachi_alt',
    overlayBase:  GREEN_BASE,
    overlayHover: GREEN_HOVER,
  },
  {
    foto:         santiagoFoto,
    nombre:       'Santi',
    rolKey:       'team_santi_rol',
    pillKey:      'team_santi_pill',
    pillClass:    'bg-brand-green/80',
    blendMode:    false,
    altKey:       'team_santi_alt',
    overlayBase:  VIOLET_BASE,
    overlayHover: VIOLET_HOVER,
  },
];

/* ── Variantes de animación ──────────────────────────────────────────────── */

const pillVariants = {
  rest:    { opacity: 0, y: 10 },
  hovered: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
};

/* ── Componente ──────────────────────────────────────────────────────────── */

export const Colaborador = () => {
  const { t } = useTranslation();

  return (
    <section
      id="equipo"
      className="relative overflow-hidden bg-brand-white py-24 px-6 border-t border-brand-gray scroll-mt-16 md:scroll-mt-20"
    >

      {/* Blob top-right */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: 'rgba(171,198,82,0.12)' }}
        aria-hidden="true"
      />

      {/* Blob bottom-left */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full blur-[80px] pointer-events-none"
        style={{ backgroundColor: 'rgba(171,198,82,0.08)' }}
        aria-hidden="true"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(171,198,82,0.08) 1px, transparent 1px)',
          backgroundSize:  '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Encabezado ──────────────────────────────────────────────────── */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-brand-green tracking-widest uppercase text-xs font-medium"
        >
          {t('team_label')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-4"
        >
          <h2 className="font-display font-black text-brand-black text-4xl md:text-6xl leading-tight">
            {t('team_heading_1')}
          </h2>
          <h2 className="font-script text-brand-violet text-4xl md:text-6xl leading-tight">
            {t('team_heading_2')}
          </h2>
          <p className="text-brand-black/50 text-lg mt-4">
            {t('team_subtitle')}
          </p>
        </motion.div>

        {/* ── Grid de cards ───────────────────────────────────────────────── */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {EQUIPO.map((miembro, idx) => (

            /* Wrapper de entrada con stagger */
            <motion.div
              key={miembro.nombre}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >

              {/* Wrapper de hover — propaga "hovered" a hijos con variants */}
              <motion.div
                initial="rest"
                whileHover="hovered"
                className="relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer group"
              >

                {/* Foto */}
                <img
                  src={miembro.foto}
                  alt={t(miembro.altKey)}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  style={miembro.blendMode ? { mixBlendMode: 'multiply' } : undefined}
                />

                {/* Overlay base — siempre visible */}
                <div
                  className="absolute inset-0"
                  style={{ background: miembro.overlayBase }}
                />

                {/* Overlay hover — intensifica el color */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: miembro.overlayHover }}
                />

                {/* Contenido sobre el overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display font-black text-white text-xl leading-tight">
                    {miembro.nombre}
                  </p>
                  <p className="text-white/70 text-sm mt-1">
                    {t(miembro.rolKey)}
                  </p>

                  {/* Pill — aparece solo en hover */}
                  <motion.div variants={pillVariants} className="mt-2">
                    <span
                      className={`${miembro.pillClass} text-white rounded-full text-xs px-3 py-1 inline-block`}
                    >
                      {t(miembro.pillKey)}
                    </span>
                  </motion.div>
                </div>

              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
