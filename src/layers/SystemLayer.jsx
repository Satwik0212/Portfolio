import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowRight, ServerCrash, CheckCircle2 } from 'lucide-react';
const ArrowRight = () => <span>{"->"}</span>;
const ServerCrash = () => <span>!</span>;
const CheckCircle2 = () => <span>V</span>;

const SystemLayer = ({ active }) => {
  const [routingState, setRoutingState] = useState(0); // 0: routing, 1: Groq fail, 2: Sarvam fail, 3: Gemini success

  // Simulate routing fallback animation loop
  useEffect(() => {
    if (!active) return;
    
    let timer;
    const runSequence = () => {
      setRoutingState(0);
      timer = setTimeout(() => {
        setRoutingState(1);
        timer = setTimeout(() => {
          setRoutingState(2);
          timer = setTimeout(() => {
            setRoutingState(3);
            timer = setTimeout(runSequence, 3000); // restart loop after 3s
          }, 1000);
        }, 1000);
      }, 1500);
    };

    runSequence();

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ 
        scale: active ? 1 : 1.4, 
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none'
      }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="absolute inset-0 flex items-center justify-center z-20"
    >
      <div className="w-full max-w-4xl p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-12 neon-text text-neon-blue">System Architecture (NyayMitra)</h2>

        {/* Main Flow */}
        <div className="flex items-center gap-4 md:gap-8 w-full justify-between relative">
          
          <Node label="User" active={true} />
          <FlowArrow />
          <Node label="LLM Router" active={true} highlight={true} />
          <FlowArrow />
          
          {/* Routing Logic Stack */}
          <div className="flex flex-col gap-4 relative">
            <RouteNode 
              label="Groq" 
              status={routingState === 0 ? 'active' : routingState >= 1 ? 'error' : 'idle'} 
            />
            <RouteNode 
              label="Sarvam" 
              status={routingState === 1 ? 'active' : routingState >= 2 ? 'error' : 'idle'} 
            />
            <RouteNode 
              label="Gemini" 
              status={routingState === 2 ? 'active' : routingState === 3 ? 'success' : 'idle'} 
            />
            
            {/* Fallback connection lines */}
            <svg className="absolute -left-8 top-6 w-8 h-24 pointer-events-none z-[-1]" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none">
              <path d="M 0 0 C 15 0 15 45 30 45" />
              <path d="M 0 0 C 15 0 15 95 30 95" />
            </svg>
          </div>

          <FlowArrow />
          <Node label="RAG Engine" active={routingState === 3} />
          <FlowArrow />
          <Node label="Response" active={routingState === 3} />
        </div>

        <div className="mt-16 text-gray-400 font-mono text-sm bg-black/50 p-4 rounded-lg border border-white/10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></div>
          Multi-LLM Fallback active: Simulating dynamic provider switching
        </div>

      </div>
    </motion.div>
  );
};

const Node = ({ label, active, highlight }) => (
  <motion.div 
    className={`glass px-6 py-4 rounded-xl flex items-center justify-center whitespace-nowrap border transition-all duration-500
      ${active ? 'opacity-100' : 'opacity-40'}
      ${highlight ? 'border-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'border-white/10'}
    `}
  >
    <span className="font-semibold">{label}</span>
  </motion.div>
);

const RouteNode = ({ label, status }) => {
  let borderColor = 'border-white/10';
  let glow = '';
  let Icon = null;

  if (status === 'active') {
    borderColor = 'border-neon-blue';
    glow = 'shadow-[0_0_15px_rgba(0,240,255,0.4)]';
  } else if (status === 'error') {
    borderColor = 'border-red-500';
    glow = 'shadow-[0_0_15px_rgba(239,68,68,0.4)] text-red-400';
    Icon = ServerCrash;
  } else if (status === 'success') {
    borderColor = 'border-green-500';
    glow = 'shadow-[0_0_15px_rgba(34,197,94,0.4)] text-green-400';
    Icon = CheckCircle2;
  }

  return (
    <div className={`glass px-4 py-2 w-32 rounded-lg flex items-center justify-between border transition-all duration-300 ${borderColor} ${glow} ${status === 'idle' ? 'opacity-40' : 'opacity-100'}`}>
      <span className="text-sm font-medium">{label}</span>
      {Icon && <Icon size={16} />}
    </div>
  );
};

const FlowArrow = () => (
  <div className="text-white/20 animate-pulse">
    <ArrowRight size={24} />
  </div>
);

export default SystemLayer;
