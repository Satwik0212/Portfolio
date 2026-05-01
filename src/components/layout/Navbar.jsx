import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-10 flex justify-between items-start pointer-events-none">
      <Link to="/" className="flex flex-col pointer-events-auto group/logo">
        <motion.div
          whileHover="hover"
          whileTap="tap"
          initial="initial"
        >
          <motion.span 
            variants={{
              initial: { x: 0 },
              hover: { x: 5, color: "#E85A2A", textShadow: "0 0 15px rgba(232, 90, 42, 0.4)" }
            }}
            className="font-serif text-3xl font-bold tracking-tight text-ph-light block transition-colors"
          >
            Satwik
          </motion.span>
          <motion.span 
            variants={{
              initial: { x: 0 },
              hover: { x: 10, italic: true }
            }}
            className="font-serif text-3xl italic text-ph-light block"
          >
            Portfolio
          </motion.span>
        </motion.div>
      </Link>

      <div className="flex flex-col items-end gap-3 pointer-events-auto">
        {/* Links removed as per user request to use Index page instead */}
      </div>
    </nav>
  );
};

export default Navbar;
