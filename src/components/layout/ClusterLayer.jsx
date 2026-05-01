import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const projects = [
  { id: 'nyaymitra', name: 'Nyay', suffix: 'Mitra', desc: 'An AI-powered legal reasoning system built with multi-LLM orchestration, RAG pipelines, and fallback routing to ensure reliability.', number: '01' },
  { id: 'lexchain', name: 'LEX', suffix: 'Chain', desc: 'Secure blockchain-based legal verification system ensuring document immutability and decentralized storage integrity.', number: '02' },
  { id: 'crisisai', name: 'Crisis', suffix: 'AI', desc: 'Real-time emergency response monitor utilizing social signals and sensor data for coordinated first-responder action.', number: '03' }
];

const AnimatedWord = ({ text, variants, staggerDelay = 0.03, startDelay = 0 }) => {
  return (
    <span className="flex overflow-hidden py-2">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={variants}
          custom={i}
          transition={{ 
            duration: 0.5, 
            delay: startDelay + (i * staggerDelay),
            ease: [0.215, 0.61, 0.355, 1]
          }}
          className="inline-block whitespace-pre"
        >
          <motion.span
            className="inline-block"
            animate={{
              y: [0, -1, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
};

const ClusterLayer = () => {
  return (
    <>
      {projects.map((project, idx) => (
        <motion.div 
          key={project.id} 
          className="w-screen h-full flex flex-col justify-center items-center relative group px-20 bg-ph-light overflow-hidden"
          initial="initial"
          whileHover="hover"
        >
          {/* THE CINEMATIC REVEAL LAYER */}
          <motion.div 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ 
              background: 'radial-gradient(circle at center, #0f0f0f, #050505)',
              transform: 'translateY(100%)' 
            }}
            variants={{
              initial: { y: "100%" },
              hover: { y: "0%" }
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* BACKGROUND DECORATION */}
            <div className="absolute top-1/2 left-20 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] font-serif text-[40vw] leading-none text-ph-light">
              {project.number}
            </div>

            {/* FOCAL GLOW */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] pointer-events-none opacity-20"
              style={{ background: `radial-gradient(circle, ${idx % 2 === 0 ? '#E85A2A' : '#5A4BCF'}, transparent 70%)` }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* CONTENT LAYER */}
          <div className="z-10 w-full flex flex-col justify-center max-w-7xl relative">
            <motion.span 
              variants={{
                initial: { opacity: 0, x: -20 },
                hover: { opacity: 0.6, x: 0, color: "#E85A2A" }
              }}
              transition={{ duration: 0.4 }}
              className="font-sans text-sm tracking-[0.5em] uppercase font-bold mb-4"
            >
              {project.number} — FEATURED
            </motion.span>
            
            <Link to={`/projects/${project.id}`} className="relative cursor-pointer w-fit">
              <h2 className="font-serif text-[10vw] leading-none uppercase flex flex-col md:flex-row items-center gap-[0.2em] tracking-tight">
                <AnimatedWord 
                  text={project.name} 
                  staggerDelay={0.03}
                  startDelay={0.1}
                  variants={{
                    initial: { color: "#050505", y: 100, opacity: 0 },
                    hover: { color: "#E85A2A", y: 0, opacity: 1 }
                  }}
                />
                <AnimatedWord 
                  text={project.suffix} 
                  staggerDelay={0.03}
                  startDelay={0.2}
                  variants={{
                    initial: { color: "#050505", y: 100, opacity: 0 },
                    hover: { color: "#EDEDED", y: 0, opacity: 1 }
                  }}
                />
              </h2>
            </Link>
            
            <motion.p 
              variants={{
                initial: { opacity: 0, y: 30, color: "#050505" },
                hover: { opacity: 0.6, y: 0, color: "#EDEDED" }
              }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-sans mt-8 text-lg max-w-xl leading-relaxed"
            >
              {project.desc}
            </motion.p>

            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                hover: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-12"
            >
              <Link to={`/projects/${project.id}`} className="group/cta flex items-center gap-4 text-ph-light/40 hover:text-ph-light transition-all">
                <div className="relative">
                  <span className="font-sans text-xs tracking-[0.3em] uppercase group-hover/cta:translate-x-2 transition-transform">View Case Study</span>
                  <motion.div 
                    className="absolute -bottom-2 left-0 h-[1px] bg-ph-orange w-0 group-hover/cta:w-full transition-all duration-500 shadow-[0_0_10px_rgba(232,90,42,0.5)]"
                  />
                </div>
                <span className="group-hover/cta:translate-x-4 transition-transform duration-300">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default ClusterLayer;
