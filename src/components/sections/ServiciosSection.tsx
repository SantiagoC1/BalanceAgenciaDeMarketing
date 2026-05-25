import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';

export const ServiciosSection: React.FC = () => {
  return (
    <Section id="servicios" title="Nuestros Servicios" subtitle="Todo lo que necesitás para crecer" className="scroll-mt-16 md:scroll-mt-20">
      <motion.div
        className="servicios-grid"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Placeholder — los servicios se cargarán desde la config */}
        <p>Cargando servicios…</p>
      </motion.div>
    </Section>
  );
};

