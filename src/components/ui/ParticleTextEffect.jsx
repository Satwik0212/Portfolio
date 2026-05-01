import React, { useEffect, useRef } from 'react';

const ParticleTextEffect = ({ words = ["SATWIK MISRA"] }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0, radius: 180 });
  const hasAssembled = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = 1100;
      canvas.height = 250;
      init();
    };

    class Particle {
      constructor(x, y, targetX, targetY) {
        // Only start from random positions if we haven't assembled yet
        if (!hasAssembled.current) {
          this.pos = { 
            x: Math.random() * canvas.width, 
            y: Math.random() * canvas.height 
          };
        } else {
          this.pos = { x: targetX, y: targetY };
        }
        
        this.target = { x: targetX, y: targetY };
        this.baseTarget = { x: targetX, y: targetY };
        this.delay = hasAssembled.current ? 0 : Math.random() * 50; 
        this.size = 2;
        this.colorWeight = hasAssembled.current ? 1 : 0;
        this.isSettled = false;
      }

      update() {
        if (this.delay > 0) {
          this.delay--;
          return;
        }

        const dx_target = this.target.x - this.pos.x;
        const dy_target = this.target.y - this.pos.y;
        const dist_target = Math.sqrt(dx_target * dx_target + dy_target * dy_target);

        // Smooth convergence
        if (dist_target > 0.1) {
          this.pos.x += dx_target * 0.08;
          this.pos.y += dy_target * 0.08;
        } else {
          this.isSettled = true;
        }

        // Mouse interaction (Repulsion)
        const dx_mouse = mouse.current.x - this.pos.x;
        const dy_mouse = mouse.current.y - this.pos.y;
        const distance_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        
        if (distance_mouse < mouse.current.radius) {
          const force = (mouse.current.radius - distance_mouse) / mouse.current.radius;
          const angle = Math.atan2(dy_mouse, dx_mouse);
          this.pos.x -= Math.cos(angle) * force * 15;
          this.pos.y -= Math.sin(angle) * force * 15;
          this.isSettled = false; // Wake up if disturbed
        }

        if (this.colorWeight < 1) this.colorWeight += 0.015;
      }

      draw() {
        if (this.delay > 0) return;
        
        ctx.globalAlpha = this.colorWeight;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      const offscreenCanvas = document.createElement('canvas');
      const offscreenCtx = offscreenCanvas.getContext('2d');
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;

      offscreenCtx.font = "bold 130px Playfair Display";
      offscreenCtx.textAlign = "left";
      offscreenCtx.textBaseline = "middle";
      offscreenCtx.fillStyle = "white";
      
      const text = words.join(" ");
      offscreenCtx.fillText(text, 0, offscreenCanvas.height / 2);

      const imageData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      const pixels = imageData.data;
      const pixelSteps = 3;

      particles.current = [];
      for (let y = 0; y < offscreenCanvas.height; y += pixelSteps) {
        for (let x = 0; x < offscreenCanvas.width; x += pixelSteps) {
          const index = (y * offscreenCanvas.width + x) * 4;
          if (pixels[index + 3] > 128) {
            particles.current.push(new Particle(x, y, x, y));
          }
        }
      }
      
      // Mark as assembled after the first init
      setTimeout(() => {
        hasAssembled.current = true;
      }, 2000);
    };

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(p => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    document.fonts.ready.then(() => {
      resize();
    });

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [words]);

  return (
    <div className="w-full h-auto flex items-center justify-start overflow-hidden relative">
      <canvas 
        ref={canvasRef} 
        className="pointer-events-none"
      />
    </div>
  );
};

export default ParticleTextEffect;
