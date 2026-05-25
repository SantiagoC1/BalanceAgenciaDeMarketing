import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';

export const PortfolioSection: React.FC = () => {
  return (
    <Section id="portfolio" title="Portfolio" subtitle="Proyectos que hablan por nosotros">
      <motion.div
        className="portfolio-grid"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Placeholder — los proyectos se cargarán desde la config */}
        <p>Cargando proyectos…</p>
      </motion.div>
    </Section>
  );
};

