'use client';

import React, { useEffect, useRef } from 'react';
import { useShop } from '@/context/ShopContext';

export default function SnowEffect() {
  const { snowActive } = useShop();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const flakeCount = 65; // Flocons visibles, légers et festifs 60fps
    const flakes = Array.from({ length: flakeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.8 + 1.2,
      vx: Math.random() * 0.8 - 0.4,
      vy: Math.random() * 1.5 + 0.8,
      opacity: Math.random() * 0.5 + 0.5
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (snowActive) {
        for (let i = 0; i < flakeCount; i++) {
          const f = flakes[i];
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
          // Blanc lumineux avec léger halo pour être parfaitement visible sur fond clair et sombre
          ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
          ctx.shadowColor = 'rgba(198, 40, 40, 0.2)';
          ctx.shadowBlur = 3;
          ctx.fill();

          f.y += f.vy;
          f.x += f.vx;

          if (f.y > height) {
            f.y = -5;
            f.x = Math.random() * width;
          }
          if (f.x > width) f.x = 0;
          if (f.x < 0) f.x = width;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [snowActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}
