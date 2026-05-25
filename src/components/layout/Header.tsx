import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoCortoFB from '../../assets/images/LogoCortoFB.png';

/* ── Tipos ───────────────────────────────────────────────────────────────── */

interface NavItem {
  label: string;
  href:  string;
}

/* ── Datos ───────────────────────────────────────────────────────────────── */

const NAV_ITEMS: NavItem[] = [
  { label: 'Sobre Nosotras', href: '#nosotras'  },
  { label: 'Servicios',      href: '#servicios' },
  { label: 'Portfolio',      href: '#portfolio' },
  { label: 'Contacto',       href: '#contacto'  },
];

/* ── Componente ──────────────────────────────────────────────────────────── */

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' as const }}
      className={[
        'sticky top-0 z-50 w-full transition-shadow duration-200',
        'bg-brand-white',
        scrolled ? 'shadow-sm' : '',
      ].join(' ')}
      aria-label="Navegación principal"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-18">

        {/* Logo */}
        <a
          href="/"
          onClick={handleLogoClick}
          aria-label="Balance — volver al inicio"
        >
          <img
            src={logoCortoFB}
            alt="Balance"
            className="h-10 md:h-30 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="
                  font-display font-medium text-sm
                  text-brand-black hover:text-brand-violet
                  transition-colors duration-200
                "
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contacto"
          className="
            hidden md:inline-flex items-center
            font-display font-medium text-sm
            bg-brand-violet text-brand-white
            rounded-md px-4 py-2
            transition-colors duration-200 hover:bg-brand-violet/90
          "
        >
          Hacer diagnóstico
        </a>

        {/* Hamburger — mobile */}
        <button
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-[2px] bg-brand-black rounded-full origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
            className="block w-5 h-[2px] bg-brand-black rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-[2px] bg-brand-black rounded-full origin-center"
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' as const }}
            className="md:hidden overflow-hidden bg-brand-white border-t border-brand-gray"
          >
            <ul className="flex flex-col px-6 py-4 gap-4 list-none m-0">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="
                      block font-display font-medium text-base py-1
                      text-brand-black hover:text-brand-violet
                      transition-colors duration-200
                    "
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contacto"
                  onClick={closeMenu}
                  className="
                    inline-flex items-center
                    font-display font-medium text-sm
                    bg-brand-violet text-brand-white
                    rounded-md px-4 py-2
                    transition-colors duration-200 hover:bg-brand-violet/90
                  "
                >
                  Hacer diagnóstico
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
