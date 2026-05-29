import logoCompletoFN from '../../assets/images/LogoCompletoFN.png';

/* ── Brand SVG icons (Lucide v1.16 no incluye iconos de marca) ── */
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={20}
    height={20}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={20}
    height={20}
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
    width={20}
    height={20}
    aria-hidden="true"
  >
    <path d="M7.803 5.731c.613 0 1.168.031 1.665.094.496.062.934.182 1.306.358.372.176.664.437.878.782.214.345.321.79.321 1.338 0 .572-.128 1.047-.384 1.421-.256.374-.637.68-1.143.919.683.199 1.194.556 1.534 1.07.34.515.51 1.136.51 1.863 0 .617-.118 1.153-.355 1.609a3.05 3.05 0 01-.968 1.075c-.406.275-.876.474-1.411.597a7.282 7.282 0 01-1.684.183H2V5.731h5.803zm-.351 4.972c.48 0 .878-.115 1.189-.346.311-.23.468-.6.468-1.108 0-.279-.051-.51-.153-.692a1.07 1.07 0 00-.415-.42 1.761 1.761 0 00-.6-.21 3.941 3.941 0 00-.709-.061H4.538v2.837h2.914zm.157 5.239c.268 0 .524-.026.766-.077.243-.051.457-.138.644-.261a1.31 1.31 0 00.44-.488c.107-.206.161-.465.161-.779 0-.617-.17-1.057-.511-1.32-.341-.264-.796-.395-1.364-.395H4.538v3.32h3.071zm9.248.636c.378.369.922.553 1.633.553.508 0 .947-.128 1.318-.384.371-.256.598-.527.682-.811h2.357c-.378 1.172-1.003 2.01-1.874 2.514-.871.504-1.924.756-3.159.756-.858 0-1.629-.141-2.314-.421a4.946 4.946 0 01-1.748-1.19 5.334 5.334 0 01-1.098-1.83 6.868 6.868 0 01-.383-2.33c0-.826.132-1.591.395-2.296a5.31 5.31 0 011.127-1.818 5.13 5.13 0 011.748-1.19c.678-.282 1.428-.422 2.251-.422.921 0 1.727.177 2.42.532a4.696 4.696 0 011.7 1.435c.44.604.756 1.3.945 2.087.189.787.258 1.622.207 2.504h-7.01c.041.786.288 1.391.668 1.76zm2.87-5.535c-.306-.338-.797-.507-1.472-.507-.431 0-.789.073-1.075.218a2.09 2.09 0 00-.685.551 2.059 2.059 0 00-.364.725 3.566 3.566 0 00-.116.72h4.456c-.089-.719-.438-1.37-.744-1.707zM15.374 7.1h4.875v1.303h-4.875V7.1z" />
  </svg>
);

interface FooterNavItem {
  label: string;
  href:  string;
}

const FOOTER_NAV: FooterNavItem[] = [
  { label: 'Sobre Nosotras', href: '#nosotras'  },
  { label: 'Servicios',      href: '#servicios' },
  { label: 'Portfolio',      href: '#portfolio' },
  { label: 'Contacto',       href: '#contacto'  },
];

export const Footer = () => {
  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <img
              src={logoCompletoFN}
              alt="Balance — Agencia de Marketing y Comunicación Argentina"
              width={200}
              height={80}
              loading="lazy"
              className="h-20 w-auto object-contain"
            />
            <p className="font-display text-sm text-brand-gray max-w-xs leading-relaxed">
              Comunicación y Marketing para marcas y líderes
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Navegación secundaria">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none m-0 p-0">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-display font-medium text-sm text-brand-gray
                               hover:text-brand-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/balance.marketing?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              aria-label="Instagram de Balance (próximamente)"
              target="_blank"
              className="text-brand-gray hover:text-brand-white transition-colors duration-200"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/balance-group-752621286"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Balance"
              className="text-brand-gray hover:text-brand-white transition-colors duration-200"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://www.behance.net/balancegroup"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Behance de Balance"
              className="text-brand-gray hover:text-brand-white transition-colors duration-200"
            >
              <BehanceIcon />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-brand-gray/20 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-white/30 text-xs font-display">
            <span>© {new Date().getFullYear()} Balance. Todos los derechos reservados.</span>
            <span>
              Desarrollado por{' '}
              <a
                href="https://scdev.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-brand-violet transition-colors duration-200"
              >
                SCdev
              </a>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
