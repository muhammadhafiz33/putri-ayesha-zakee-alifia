import React, { useRef, useEffect } from 'react';

const BackgroundParticles = ({
  color = '#ffffff',
  quantity = 150,
  staticity = 50,
  ease = 50,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const renderFrame = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    initCanvas();
    animate();
    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('resize', initCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      if (renderFrame.current) {
        window.cancelAnimationFrame(renderFrame.current);
      }
    };
  }, []);

  const onMouseMove = (e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  };

  const initCanvas = () => {
    if (canvasRef.current && context.current) {
      canvasSize.current.w = canvasRef.current.parentElement.offsetWidth;
      canvasSize.current.h = canvasRef.current.parentElement.offsetHeight;

      canvasRef.current.width = canvasSize.current.w;
      canvasRef.current.height = canvasSize.current.h;

      circles.current = [];
      for (let i = 0; i < quantity; i++) {
        circles.current.push({
          x: Math.random() * canvasSize.current.w,
          y: Math.random() * canvasSize.current.h,
          w: Math.random() * 2 + 0.5,
          color: color,
          alpha: Math.random() * 0.5 + 0.1,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
        });
      }
    }
  };

  const drawCircle = (circle) => {
    if (context.current) {
      context.current.beginPath();
      context.current.arc(circle.x, circle.y, circle.w, 0, 2 * Math.PI);
      context.current.fillStyle = `${circle.color}${Math.floor(circle.alpha * 255).toString(16).padStart(2, '0')}`;
      context.current.fill();
    }
  };

  const animate = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
      circles.current.forEach((circle, i) => {
        // Simple movement
        circle.x += circle.vx;
        circle.y += circle.vy;

        // Wrap around
        if (circle.x < 0) circle.x = canvasSize.current.w;
        if (circle.x > canvasSize.current.w) circle.x = 0;
        if (circle.y < 0) circle.y = canvasSize.current.h;
        if (circle.y > canvasSize.current.h) circle.y = 0;

        // Interaction with mouse (simple parallax/attraction based on distance)
        const dx = mouse.current.x - circle.x;
        const dy = mouse.current.y - circle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          circle.x -= dx / staticity;
          circle.y -= dy / staticity;
        }

        drawCircle(circle);
      });
      renderFrame.current = window.requestAnimationFrame(animate);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={{
        background: 'linear-gradient(to bottom, #0a0a14, #1a1a2e)',
      }}
    />
  );
};

export default BackgroundParticles;
