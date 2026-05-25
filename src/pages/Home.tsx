import {
  Hero,
  SobreNosotras,
  Servicios,
  Portfolio,
  CTADiagnostico,
  Contacto,
} from '../components/sections';

export const Home = () => {
  return (
    <>
      <Hero />
      <SobreNosotras />
      <Servicios />
      <Portfolio />
      <CTADiagnostico />
      <Contacto />
    </>
  );
};
