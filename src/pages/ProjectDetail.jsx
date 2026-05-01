import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const projectIndex = projects.findIndex(p => p.id === id);
  const project = projects[projectIndex];

  if (!project) return <Navigate to="/projects" />;

  // Split title into first word and the rest for specific animations
  const words = project.title.split(' ');
  const firstWord = words[0];
  const remainingWords = words.slice(1).join(' ');

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-[#050505]" 
         style={{ background: 'radial-gradient(circle at center, #0f0f0f, #050505)' }}>
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] font-serif text-[40vw] leading-none text-ph-light z-0">
        0{projectIndex + 1}
      </div>

      {/* FOCAL GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] pointer-events-none z-0"
           style={{ background: 'radial-gradient(circle, rgba(232, 90, 42, 0.1), transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-7xl px-8 py-20 flex flex-col items-center text-center">
        
        {/* BACK LINK */}
        <Link to="/projects" className="group absolute top-12 left-12 flex items-center gap-2 text-ph-light/40 hover:text-ph-light font-sans text-xs uppercase tracking-widest transition-all">
          <span className="group-hover:-translate-x-2 transition-transform">←</span>
          <span>Back to Grid</span>
        </Link>

        {/* PROJECT TITLE EXPERIENCE */}
        <motion.div 
          className="relative cursor-default group"
          initial="initial"
          whileHover="hover"
        >
          <h1 className="font-serif text-[12vw] leading-none text-[#EDEDED] flex flex-col md:flex-row items-center justify-center gap-[0.2em] tracking-tight text-soft">
            <motion.span
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              variants={{
                hover: { x: -20, scale: 1.02 }
              }}
              className="inline-block"
            >
              {firstWord}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              variants={{
                hover: { x: 20, scale: 1.02 }
              }}
              className="inline-block italic font-light"
            >
              {remainingWords}
            </motion.span>
          </h1>
        </motion.div>

        {/* PROJECT METADATA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex flex-col items-center max-w-2xl"
        >
          <p className="font-sans text-ph-orange uppercase tracking-[0.4em] text-xs font-bold mb-6">
            {project.description}
          </p>
          
          <p className="font-sans text-[#EDEDED] opacity-60 text-base leading-relaxed mb-12 max-w-xl">
            {project.longDescription}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {project.tech.map(tech => (
              <span key={tech} className="border border-ph-light/10 text-ph-light/40 px-3 py-1 font-sans text-[10px] uppercase tracking-widest rounded-full">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-12">
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-[#EDEDED] font-sans text-xs uppercase tracking-[0.3em] font-bold"
            >
              <span className="opacity-40 group-hover:opacity-100 transition-opacity">View Repository</span>
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">→</span>
            </a>
            {project.links.live && (
              <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-ph-orange font-sans text-xs uppercase tracking-[0.3em] font-bold"
              >
                <span className="group-hover:underline underline-offset-8">Live Experience</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </a>
            )}
          </div>
        </motion.div>

      </div>

      {/* SUBTLE GRAIN & OVERLAY (Handled by Global Styles, but adding extra depth here) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0" />
    </div>
  );
};

export default ProjectDetail;
