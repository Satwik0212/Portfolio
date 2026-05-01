import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../components/ui/SectionTitle';

const About = () => {
  return (
    <div className="pt-40 pb-20 px-8 max-w-7xl mx-auto bg-ph-purple min-h-screen text-ph-light">
      <SectionTitle title="ABOUT" subtitle="AI Systems Engineer" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="font-serif text-4xl mb-8 leading-tight">
            I build highly optimized, scalable infrastructure that bridges the gap between ML models and real-world applications.
          </h3>
          <p className="font-sans text-lg opacity-70 leading-relaxed mb-8">
            As an AI Systems Engineer, my focus is on LLM orchestration, RAG pipelines, and large-scale data processing. I thrive at the intersection of backend engineering and cutting-edge artificial intelligence.
          </p>
          <p className="font-sans text-lg opacity-70 leading-relaxed">
            With a background in full-stack development and a passion for automation, I aim to create systems that are not just functional, but efficient and resilient.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-12"
        >
          <div>
            <h4 className="font-sans text-sm uppercase tracking-widest text-ph-orange mb-4">Focus Areas</h4>
            <ul className="space-y-4 font-serif text-2xl">
              <li>LLM Orchestration</li>
              <li>Retrieval Augmented Generation (RAG)</li>
              <li>Scalable Data Pipelines</li>
              <li>Cloud-Native AI Architectures</li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm uppercase tracking-widest text-ph-orange mb-4">Core Stack</h4>
            <div className="flex flex-wrap gap-4 font-sans text-sm tracking-widest">
              {["Python", "Rust", "TypeScript", "Go", "AWS", "Docker", "PyTorch", "LangChain"].map(tech => (
                <span key={tech} className="border border-ph-light/20 px-4 py-2 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
