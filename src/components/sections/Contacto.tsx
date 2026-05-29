import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useConfig } from '../../hooks/useConfig';

/* ── Props ───────────────────────────────────────────────────────────────── */

interface ContactoProps {
  onOpen: () => void;
}

/* ── Íconos de marca (SVG inline, igual que Footer) ─────────────────────── */

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={18}
    height={18}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={18}
    height={18}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BehanceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={18}
    height={18}
    aria-hidden="true"
  >
    <path d="M7.803 5.731c.613 0 1.168.031 1.665.094.496.062.934.182 1.306.358.372.176.664.437.878.782.214.345.321.79.321 1.338 0 .572-.128 1.047-.384 1.421-.256.374-.637.68-1.143.919.683.199 1.194.556 1.534 1.07.34.515.51 1.136.51 1.863 0 .617-.118 1.153-.355 1.609a3.05 3.05 0 01-.968 1.075c-.406.275-.876.474-1.411.597a7.282 7.282 0 01-1.684.183H2V5.731h5.803zm-.351 4.972c.48 0 .878-.115 1.189-.346.311-.23.468-.6.468-1.108 0-.279-.051-.51-.153-.692a1.07 1.07 0 00-.415-.42 1.761 1.761 0 00-.6-.21 3.941 3.941 0 00-.709-.061H4.538v2.837h2.914zm.157 5.239c.268 0 .524-.026.766-.077.243-.051.457-.138.644-.261a1.31 1.31 0 00.44-.488c.107-.206.161-.465.161-.779 0-.617-.17-1.057-.511-1.32-.341-.264-.796-.395-1.364-.395H4.538v3.32h3.071zm9.248.636c.378.369.922.553 1.633.553.508 0 .947-.128 1.318-.384.371-.256.598-.527.682-.811h2.357c-.378 1.172-1.003 2.01-1.874 2.514-.871.504-1.924.756-3.159.756-.858 0-1.629-.141-2.314-.421a4.946 4.946 0 01-1.748-1.19 5.334 5.334 0 01-1.098-1.83 6.868 6.868 0 01-.383-2.33c0-.826.132-1.591.395-2.296a5.31 5.31 0 011.127-1.818 5.13 5.13 0 011.748-1.19c.678-.282 1.428-.422 2.251-.422.921 0 1.727.177 2.42.532a4.696 4.696 0 011.7 1.435c.44.604.756 1.3.945 2.087.189.787.258 1.622.207 2.504h-7.01c.041.786.288 1.391.668 1.76zm2.87-5.535c-.306-.338-.797-.507-1.472-.507-.431 0-.789.073-1.075.218a2.09 2.09 0 00-.685.551 2.059 2.059 0 00-.364.725 3.566 3.566 0 00-.116.72h4.456c-.089-.719-.438-1.37-.744-1.707zM15.374 7.1h4.875v1.303h-4.875V7.1z" />
  </svg>
);

/* ── Variants Framer Motion ──────────────────────────────────────────────── */

const ctaVariants = {
  rest:  { scale: 1   },
  hover: { scale: 1.05 },
};

const bgRevealVariants = {
  rest:  { scale: 0, opacity: 0 },
  hover: { scale: 1, opacity: 1 },
};


/* ── Componente ──────────────────────────────────────────────────────────── */

export const Contacto = ({ onOpen }: ContactoProps) => {
  const { config = {} } = useConfig()

  const contactLinks = [
    {
      href:      `mailto:${config?.email || 'somosbalance.mkt@gmail.com'}`,
      label:     config?.email || 'somosbalance.mkt@gmail.com',
      ariaLabel: 'Enviar email a Balance',
      icon:      <Mail size={18} aria-hidden="true" />,
      external:  true,
    },
    {
      href:      config?.instagram || 'https://www.instagram.com/balance.marketing',
      label:     '@balance.marketing',
      ariaLabel: 'Instagram de Balance',
      icon:      <InstagramIcon />,
      external:  true,
    },
    {
      href:      config?.linkedin || 'https://www.linkedin.com/in/balance-group-752621286',
      label:     'balance-group',
      ariaLabel: 'LinkedIn de Balance',
      icon:      <LinkedInIcon />,
      external:  true,
    },
    {
      href:      config?.behance || 'https://www.behance.net/balancegroup',
      label:     'balancegroup',
      ariaLabel: 'Behance de Balance',
      icon:      <BehanceIcon />,
      external:  true,
    },
  ]

  /* ── Efecto magnético ──────────────────────────────────────────────────── */
  const magnetRef = useRef<HTMLDivElement>(null);
  const rawX      = useMotionValue(0);
  const rawY      = useMotionValue(0);
  const springX   = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY   = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magnetRef.current) return;
    const rect = magnetRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    rawX.set((e.clientX - cx) * 0.25);
    rawY.set((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  /* ── Render ────────────────────────────────────────────────────────────── */
  return (
    <section
      id="contacto"
      className="bg-brand-black min-h-screen flex flex-col justify-center relative overflow-hidden py-24 px-6 scroll-mt-16 md:scroll-mt-20"
      aria-label="Contacto"
    >

      {/* ── Texto fantasma rotante ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.p
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="text-white/[0.03] font-display font-black whitespace-nowrap"
          style={{ fontSize: 'clamp(80px, 15vw, 180px)', letterSpacing: '-0.02em' }}
        >
          HABLEMOS · HABLEMOS · HABLEMOS ·
        </motion.p>
      </div>

      {/* ── Contenido principal ───────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-display font-medium text-brand-green tracking-widest uppercase text-xs mb-8"
        >
          CONTACTO
        </motion.p>

        {/* Headline enorme */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <h2
            className="font-display font-black text-white leading-none mb-2"
            style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}
          >
            ¿Listo para
          </h2>
          <h2
            className="font-script text-brand-violet leading-none mb-12"
            style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}
          >
            construir tu marca?
          </h2>
        </motion.div>

        {/* Grid dos columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">

          {/* ── Columna izquierda: info de contacto ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="space-y-6 order-2 md:order-1"
          >
            {/* Separador decorativo */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-brand-violet flex-shrink-0" />
              <p className="font-display text-white/40 text-sm">
                Respondemos en menos de 24 horas habiles
              </p>
            </div>

            {/* Links de contacto */}
            <div className="space-y-3">
              {contactLinks.map(({ href, label, ariaLabel, icon, external }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={ariaLabel}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 text-white/50 group-hover:border-brand-violet group-hover:bg-brand-violet/10 group-hover:text-brand-violet transition-all duration-300">
                    {icon}
                  </div>
                  <span className="font-display text-sm text-white/60 group-hover:text-white transition-colors duration-200">
                    {label}
                  </span>
                </a>
              ))}
            </div>

            {/* Frase script */}
            <p className="font-script text-brand-violet text-2xl pt-4">
              Creamos juntos ✦
            </p>
          </motion.div>

          {/* ── Columna derecha: CTA magnético ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="flex flex-col items-center md:items-end gap-8 order-1 md:order-2"
          >
            {/* Zona magnética */}
            <div
              ref={magnetRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-52 h-52 flex items-center justify-center"
            >
              <motion.button
                type="button"
                onClick={onOpen}
                variants={ctaVariants}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                style={{
                  x:         springX,
                  y:         springY,
                  boxShadow: '0 0 60px rgba(76,76,230,0.3)',
                }}
                className="relative w-52 h-52 rounded-full bg-brand-violet flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                aria-label="Abrir formulario de diagnóstico gratuito"
              >
                {/* Fondo verde que aparece en hover */}
                <motion.div
                  variants={bgRevealVariants}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-brand-green rounded-full"
                />

                {/* Texto */}
                <span className="relative z-10 font-display font-black text-white text-lg text-center leading-tight">
                  Hacer<br />diagnóstico<br />gratuito
                </span>

                
              </motion.button>
            </div>

            {/* Leyenda */}
            <p className="hidden md:block font-display text-white/25 text-xs text-center md:text-right max-w-[200px]">
              Sin compromiso · Respondemos en 24hs habiles
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
