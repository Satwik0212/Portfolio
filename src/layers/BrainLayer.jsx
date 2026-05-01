import React from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 1, label: 'Projects', x: -150, y: -100, color: 'bg-neon-blue' },
  { id: 2, label: 'Systems', x: 150, y: -50, color: 'bg-neon-purple' },
  { id: 3, label: 'Skills', x: 0, y: 150, color: 'bg-neon-blue' },
  { id: 4, label: 'Experience', x: -200, y: 100, color: 'bg-neon-purple' },
  { id: 5, label: 'Education', x: 200, y: 100, color: 'bg-neon-blue' },
];

const BrainLayer = ({ active }) => {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ 
        scale: active ? 1 : 1.4, 
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none'
      }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="absolute inset-0 flex items-center justify-center z-40"
    >
      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        {/* Central Hub */}
        <motion.div 
          className="absolute w-32 h-32 rounded-full glass flex items-center justify-center border-neon-blue/50 border z-10"
          animate={{ 
            boxShadow: ['0 0 20px rgba(0, 240, 255, 0.2)', '0 0 60px rgba(0, 240, 255, 0.6)', '0 0 20px rgba(0, 240, 255, 0.2)']
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-white font-bold tracking-widest text-lg">MIND</span>
        </motion.div>

        {/* Nodes and Connections */}
        <svg className="absolute inset-0 w-full h-full -z-10" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.5))' }}>
          {nodes.map(node => (
            <motion.line
              key={`line-${node.id}`}
              x1="300" y1="300"
              x2={300 + node.x} y2={300 + node.y}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: active ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}
        </svg>

        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className={`absolute w-24 h-24 rounded-full glass flex items-center justify-center backdrop-blur-xl border border-white/20`}
            style={{
              x: node.x,
              y: node.y,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: active ? 1 : 0, 
              scale: active ? 1 : 0,
              y: [node.y - 10, node.y + 10, node.y - 10]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: i * 0.1 },
              scale: { duration: 0.8, delay: i * 0.1, type: "spring" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
            }}
          >
            <div className={`absolute inset-0 rounded-full opacity-20 blur-md ${node.color}`}></div>
            <span className="text-sm font-medium z-10">{node.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BrainLayer;
