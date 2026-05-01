import React, { useRef, useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useTransform } from 'framer-motion';

import Surface from '../components/layout/Surface';
import IndexLayer from '../components/layout/IndexLayer';
import ClusterLayer from '../components/layout/ClusterLayer';
import DeepLayer from '../components/layout/DeepLayer';
import CursorTrail from '../components/ui/CursorTrail';

const Home = () => {
  const targetRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map scroll progress (0 to 1) to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.33%"]);

  useEffect(() => {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleReveal = () => setRevealed(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleReveal);
    window.addEventListener('scroll', handleReveal);

    const animateSpotlight = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      document.documentElement.style.setProperty('--x', `${currentX}px`);
      document.documentElement.style.setProperty('--y', `${currentY}px`);

      requestAnimationFrame(animateSpotlight);
    };

    const animationId = requestAnimationFrame(animateSpotlight);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleReveal);
      window.removeEventListener('scroll', handleReveal);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="hero-container relative">
        <CursorTrail />
        <div className={`spotlight-overlay ${revealed ? 'hidden' : ''}`} />
        
        <div className="content-layer relative z-1">
          <main ref={targetRef} className="relative h-[600vh] bg-ph-orange">
            <div className="sticky top-0 h-screen w-screen overflow-hidden">
              
              <motion.div style={{ x }} className="flex h-full w-[600vw] will-change-transform">
                {/* HERO SECTION */}
                <section className="h-full w-screen flex-shrink-0 relative overflow-hidden bg-ph-orange text-ph-light border-r border-ph-light/10">
                  <Surface />
                </section>

                {/* INDEX SECTION */}
                <section className="h-full w-screen flex-shrink-0 relative overflow-hidden bg-[#050505] text-ph-light border-r border-ph-light/10">
                  <IndexLayer />
                </section>
                
                {/* WORK SHOWCASE SECTION (300vw) */}
                <section className="h-full w-[300vw] flex-shrink-0 relative overflow-hidden bg-ph-light text-ph-black flex border-r border-ph-light/10">
                  <ClusterLayer />
                </section>
                
                {/* ABOUT TEASER SECTION */}
                <section className="h-full w-screen flex-shrink-0 relative overflow-hidden bg-ph-purple text-ph-light">
                  <DeepLayer />
                </section>
              </motion.div>

              {/* Home-specific scroll indicator */}
              <div className="absolute bottom-8 right-8 z-10 font-sans text-xs uppercase tracking-widest text-ph-light opacity-30">
                Scroll to explore
              </div>
            </div>
          </main>
        </div>
      </div>
    </ReactLenis>
  );
};

export default Home;
