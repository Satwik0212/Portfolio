import React, { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  // Smoothly interpolated mouse position
  const lerpMouse = useRef({ x: 0, y: 0 });
  const actualMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e) => {
      actualMouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Increased LERP factor for closer tracking while maintaining smoothness
      lerpMouse.current.x += (actualMouse.current.x - lerpMouse.current.x) * 0.35;
      lerpMouse.current.y += (actualMouse.current.y - lerpMouse.current.y) * 0.35;

      // Spawn particles directly at the lerped position which is now much closer to cursor
      if (Math.abs(actualMouse.current.x - lerpMouse.current.x) > 0.01 || 
          Math.abs(actualMouse.current.y - lerpMouse.current.y) > 0.01) {
        
        for (let i = 0; i < 2; i++) {
          particles.current.push({
            x: lerpMouse.current.x,
            y: lerpMouse.current.y,
            size: Math.random() * 3 + 1,
            alpha: 1,
            // Small random drift for "proper" look
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
          });
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        p.size *= 0.96; // Shrink over time

        if (p.alpha > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.fill();
        }
      }

      // Cleanup
      particles.current = particles.current.filter(p => p.alpha > 0);

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      style={{ filter: 'blur(0.5px)' }} // Subtle blur for a "glow" look
    />
  );
};

export default CursorTrail;
