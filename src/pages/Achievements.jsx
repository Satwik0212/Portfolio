import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../data/achievements';
import { SectionTitle } from '../components/ui/SectionTitle';

const Achievements = () => {
  return (
    <div className="pt-40 pb-20 px-8 max-w-7xl mx-auto bg-ph-orange min-h-screen text-ph-light">
      <SectionTitle title="RECOGNITION" subtitle="Awards & Milestones" />

      <div className="flex flex-col space-y-1">
        {achievements.map((achievement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group py-12 border-b border-ph-light/20 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="max-w-2xl">
              <span className="font-sans text-xs uppercase tracking-widest opacity-60 mb-2 block">
                {achievement.year}
              </span>
              <h3 className="font-serif text-[5vw] leading-none mb-4 group-hover:italic transition-all">
                {achievement.title}
              </h3>
              <p className="font-sans text-lg opacity-80">
                {achievement.description}
              </p>
            </div>
            
            <div className="mt-8 md:mt-0 font-sans text-xs uppercase tracking-widest border border-ph-light px-6 py-2 opacity-40 group-hover:opacity-100 transition-opacity">
              Achievement
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
