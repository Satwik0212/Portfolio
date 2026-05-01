import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const IndexLayer = () => {
  const menuItems = [
    { name: 'About', path: '/about', label: '01 — THE VISION' },
    { name: 'Projects', path: '/projects', label: '02 — THE WORK' },
    { name: 'Certifications', path: '/certifications', label: '03 — THE PROOF' },
    { name: 'Achievements', path: '/achievements', label: '04 — THE IMPACT' },
    { name: 'Contact', path: '/contact', label: '05 — THE CONNECTION' },
  ];

  return (
    <div className="w-screen h-full flex flex-col justify-center items-center relative px-20 bg-[#050505] overflow-hidden">
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] opacity-10 bg-radial-glow from-ph-orange/20 to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="z-10 w-full max-w-7xl flex flex-col items-start gap-12">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 0.6, x: 0 }}
          className="font-sans text-xs tracking-[0.6em] uppercase text-ph-light/60"
        >
          NAVIGATION INDEX
        </motion.span>

        <div className="flex flex-col gap-8 w-full">
          {menuItems.map((item, idx) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              viewport={{ once: true }}
              className="group/index relative"
            >
              <Link to={item.path} className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
                <span className="font-sans text-[10px] tracking-[0.4em] text-ph-orange/40 group-hover/index:text-ph-orange transition-colors duration-500 mb-2 md:mb-4">
                  {item.label}
                </span>
                
                <h2 className="font-serif text-[8vw] md:text-[6vw] leading-none uppercase text-ph-light/20 group-hover/index:text-ph-light transition-all duration-700 flex items-center gap-8 group-hover/index:gap-12">
                  <span className="group-hover/index:italic transition-all">{item.name}</span>
                  <span className="opacity-0 group-hover/index:opacity-100 group-hover/index:translate-x-4 transition-all duration-500 text-ph-orange text-[4vw]">
                    →
                  </span>
                </h2>
              </Link>
              
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-ph-light/10 group-hover/index:w-full transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* DECORATIVE CORNER NUMBER */}
      <div className="absolute bottom-10 right-10 font-serif text-[15vw] text-ph-light/5 select-none pointer-events-none">
        INDEX
      </div>
    </div>
  );
};

export default IndexLayer;
