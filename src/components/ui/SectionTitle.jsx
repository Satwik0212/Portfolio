import React from 'react';
import { motion } from 'framer-motion';

export const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-serif text-[8vw] leading-none text-ph-orange mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-lg uppercase tracking-widest text-ph-light/60"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
