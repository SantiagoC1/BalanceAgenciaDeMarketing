import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen font-display">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
