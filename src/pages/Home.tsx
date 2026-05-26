import { useState } from 'react';
import { Layout } from '../components/layout';
import {
  Hero,
  SobreNosotras,
  Servicios,
  Portfolio,
  CTADiagnostico,
  Contacto,
} from '../components/sections';
import { DiagnosticoModal } from '../components/sections/DiagnosticoModal';

export const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Layout onDiagnostico={() => setModalOpen(true)}>
      <Hero />
      <SobreNosotras />
      <Servicios />
      <Portfolio />
      <CTADiagnostico />
      <Contacto onOpen={() => setModalOpen(true)} />
      <DiagnosticoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Layout>
  );
};
