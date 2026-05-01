import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../data/certifications';
import { SectionTitle } from '../components/ui/SectionTitle';

const Certifications = () => {
  return (
    <div className="pt-40 pb-20 px-8 max-w-7xl mx-auto bg-ph-purple min-h-screen text-ph-light">
      <SectionTitle title="CREDENTIALS" subtitle="Certifications & Training" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {certifications.map((group, groupIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIdx * 0.2 }}
          >
            <h3 className="font-serif text-3xl text-ph-orange mb-8 pb-4 border-b border-ph-light/10">
              {group.category}
            </h3>
            <div className="space-y-8">
              {group.items.map((cert, certIdx) => (
                <div key={certIdx} className="group cursor-pointer">
                  <span className="font-sans text-xs uppercase tracking-widest text-ph-orange opacity-60">
                    {cert.issuer}
                  </span>
                  <h4 className="font-serif text-2xl group-hover:text-ph-orange transition-colors">
                    {cert.name}
                  </h4>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
