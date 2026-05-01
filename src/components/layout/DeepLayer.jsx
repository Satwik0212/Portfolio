import React from 'react';
import { motion } from 'framer-motion';

const DeepLayer = () => {
  return (
    <div className="w-full h-full flex items-stretch">
      <div className="w-1/2 relative bg-ph-purple overflow-hidden flex justify-center items-center border-r border-ph-light/20">
        
        {/* Background shapes isolated in their own gooey container */}
        <div className="absolute inset-0 gooey pointer-events-none z-0">
          <motion.div 
            className="absolute w-[25vw] h-[25vw] bg-ph-orange rounded-full mix-blend-multiply opacity-60 blur-2xl"
            animate={{
              x: [-50, 50, 0, -50],
              y: [-50, 0, 50, -50],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute w-[20vw] h-[20vw] bg-[#00f0ff] rounded-full mix-blend-multiply opacity-60 blur-2xl right-1/4 bottom-1/4"
            animate={{
              x: [50, -50, 0, 50],
              y: [50, 0, -50, 50],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <h2 className="z-10 font-serif text-[6vw] text-ph-light leading-none -rotate-90 origin-center drop-shadow-xl pointer-events-none">
          ABOUT<br/>ME
        </h2>
      </div>

      {/* Right side - Content */}
      <div className="w-1/2 bg-ph-purple flex flex-col justify-center p-24 text-ph-light relative">
        <p className="font-sans text-sm tracking-widest uppercase mb-12 opacity-70">
          Profile
        </p>
        
        <h3 className="font-serif text-5xl leading-tight mb-8">
          I'm Satwik Misra, an AI Systems Engineer specializing in LLM orchestration and data pipelines.
        </h3>
        
        <p className="font-sans text-lg opacity-80 leading-relaxed mb-12 max-w-xl">
          Passionate about building highly optimized, scalable infrastructure that bridges the gap between machine learning models and real-world applications. Currently working on cutting edge AI architectures and full-stack solutions.
        </p>

        <div className="flex gap-16">
          <div>
            <h4 className="font-sans text-sm tracking-widest uppercase mb-4 opacity-70">Skills</h4>
            <ul className="font-sans text-lg opacity-80 leading-loose">
              <li>Python / Rust</li>
              <li>React / Node.js</li>
              <li>AWS / Docker</li>
              <li>LLMs / LangChain</li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-sm tracking-widest uppercase mb-4 opacity-70">Contact</h4>
            <ul className="font-sans text-lg opacity-80 leading-loose">
              <li className="hover:text-ph-orange transition-colors cursor-pointer">LinkedIn</li>
              <li className="hover:text-ph-orange transition-colors cursor-pointer">GitHub</li>
              <li className="hover:text-ph-orange transition-colors cursor-pointer">Email</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepLayer;
