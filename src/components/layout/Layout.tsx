import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

/* ── Props ───────────────────────────────────────────────────────────────── */

interface LayoutProps {
  children?:       ReactNode;
  onDiagnostico?:  () => void;
}

/* ── Componente ──────────────────────────────────────────────────────────── */

export const Layout = ({ children, onDiagnostico }: LayoutProps) => {
  return (
    <>
      <Header onDiagnostico={onDiagnostico} />
      <main className="min-h-screen font-display">
        {children ?? <Outlet />}
      </main>
      <Footer />
    </>
  );
};
