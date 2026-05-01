import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState("default");
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for the cursor follow
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check what's under the cursor to update state
      const target = e.target;
      if (target.closest('a, button, .cursor-pointer')) {
        setCursorType("pointer");
      } else if (target.closest('h1, .cursor-text')) {
        setCursorType("text");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      height: 12,
      width: 12,
      backgroundColor: "#efefe6",
      mixBlendMode: "difference"
    },
    pointer: {
      height: 60,
      width: 60,
      backgroundColor: "#ff4d00",
      mixBlendMode: "normal",
      opacity: 0.8
    },
    text: {
      height: 120,
      width: 120,
      backgroundColor: "#efefe6",
      mixBlendMode: "difference",
      opacity: 0.1,
      filter: "blur(20px)"
    }
  };

  return (
    <>
      {/* Primary Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={cursorType}
        variants={variants}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.5 }}
      >
        {cursorType === "pointer" && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 bg-white rounded-full"
          />
        )}
      </motion.div>

      {/* Subtle Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-ph-light/20 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorType === "pointer" ? 1.5 : 1,
          opacity: cursorType === "text" ? 0 : 1
        }}
      />
    </>
  );
};

export default CustomCursor;
