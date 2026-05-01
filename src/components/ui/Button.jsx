import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, onClick, className = "", variant = "primary" }) => {
  const baseStyles = "px-8 py-3 font-sans text-sm uppercase tracking-widest transition-all duration-300";
  const variants = {
    primary: "bg-ph-orange text-ph-light hover:bg-ph-purple",
    outline: "border border-ph-orange text-ph-orange hover:bg-ph-orange hover:text-ph-light",
    ghost: "text-ph-light opacity-60 hover:opacity-100"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
