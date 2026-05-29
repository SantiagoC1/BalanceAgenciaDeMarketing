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
import { useConfig } from '../hooks/useConfig';

export const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { formConfig } = useConfig();

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
        formConfig={formConfig}
      />
    </Layout>
  );
};
