import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleTextEffect from '../ui/ParticleTextEffect';

const Surface = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ["AI Systems Engineer", "Backend Architect", "LLM Systems Builder"];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax for blobs and image
  const blob1X = useTransform(smoothX, [0, 1920], [-100, 100]);
  const blob1Y = useTransform(smoothY, [0, 1080], [-80, 80]);
  const imgX = useTransform(smoothX, [0, 1920], [-15, 15]);
  const imgY = useTransform(smoothY, [0, 1080], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(roleInterval);
    };
  }, [mouseX, mouseY]);

  const smoothTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row relative overflow-hidden bg-ph-orange px-10 md:px-24">


      {/* BACKGROUND DECORATIVE BLOBS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          className="absolute left-[10%] top-[20%] w-[50vw] h-[50vw] bg-ph-purple rounded-full mix-blend-overlay opacity-30 blur-[100px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ x: useTransform(smoothX, [0, 1920], [50, -50]), y: useTransform(smoothY, [0, 1080], [40, -40]) }}
          className="absolute right-[5%] bottom-[10%] w-[40vw] h-[40vw] bg-ph-yellow rounded-full mix-blend-overlay opacity-30 blur-[100px]"
          animate={{ scale: [1, 0.9, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* LEFT COLUMN: IDENTITY & CONTENT */}
      <div className="flex-1 z-10 flex flex-col justify-center items-start pt-32 md:pt-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero-title overflow-hidden relative">
            <h1 className="absolute top-0 left-0 opacity-0 pointer-events-none">
              Satwik Misra
            </h1>
            <ParticleTextEffect words={["SATWIK MISRA"]} />
          </div>

          <div className="h-10 mt-4">
            <motion.p
              key={currentRole}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-sans text-ph-orange bg-ph-light px-4 py-1 rounded-full text-sm md:text-base font-bold tracking-widest inline-block uppercase shadow-lg shadow-black/10"
            >
              {roles[currentRole]}
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans mt-8 text-ph-light text-lg md:text-xl max-w-xl leading-relaxed"
          >
            Building intelligent backend systems using LLM orchestration, RAG pipelines, and scalable AI architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 mt-8 font-sans text-[11px] uppercase tracking-[0.3em] text-ph-light"
          >
            <span>SIH 2025 Finalist</span>
            <span className="w-1.5 h-1.5 rounded-full bg-ph-light/40" />
            <span>5+ Hackathons</span>
            <span className="w-1.5 h-1.5 rounded-full bg-ph-light/40" />
            <span>AI Builder</span>
          </motion.div>

          <div className="mt-12 flex flex-wrap gap-6">
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(232, 90, 42, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-ph-light text-ph-orange font-sans px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all"
              >
                View Projects
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="border border-ph-light/30 text-ph-light font-sans px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all"
              >
                Contact Me
              </motion.button>
            </Link>
          </div>

          <div className="mt-12 flex gap-6">
            {['github', 'linkedin', 'mail'].map((icon, i) => (
              <motion.a
                key={icon}
                href="#"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.4, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ opacity: 1, y: -5, color: "#EDEDED" }}
                className="text-ph-light text-xl"
              >
                <i className={`fab fa-${icon === 'mail' ? 'google' : icon}`}></i>
                {/* Fallback if font-awesome is not loaded */}
                <span className="sr-only">{icon}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* RIGHT COLUMN: VISUAL IMAGE */}
      <div className="flex-1 z-10 flex justify-center items-center py-20 md:py-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          style={{ x: imgX, y: imgY }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-ph-orange rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
          <motion.div
            className="w-72 h-72 md:w-[28vw] md:h-[28vw] rounded-full overflow-hidden border-[12px] border-ph-light/10 relative shadow-[0_0_60px_rgba(255,120,60,0.2)]"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/src/assets/satwik.jpeg"
              alt="Satwik Misra"
              className="w-full h-full object-cover object-[50%_30%] grayscale-[20%] group-hover:grayscale-0 hover:scale-105 transition-all duration-500"
            />
          </motion.div>
          {/* Floating Accents */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 w-12 h-12 border border-ph-light/20 rounded-full flex items-center justify-center font-serif italic text-ph-light/40 text-xs"
          >
            AI
          </motion.div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 z-20 flex flex-col items-center gap-4 text-ph-light/40 font-sans text-xs uppercase tracking-[0.4em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
          <span className="group-hover:text-ph-light transition-colors">Explore My Work</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-lg"
          >
            ↓
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Surface;
