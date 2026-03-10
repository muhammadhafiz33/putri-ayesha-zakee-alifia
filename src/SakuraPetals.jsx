import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SakuraPetal = ({ id, onComplete }) => {
  const [randoms] = useState(() => ({
    left: Math.random() * 100,
    size: 15 + Math.random() * 20,
    duration: 10 + Math.random() * 15,
    delay: Math.random() * 5,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 50,
  }));

  return (
    <motion.div
      initial={{
        top: -50,
        left: `${randoms.left}%`,
        opacity: 0,
        rotate: randoms.rotation,
        scale: 0.5,
      }}
      animate={{
        top: '110vh',
        left: `${randoms.left + randoms.drift}%`,
        opacity: [0, 0.8, 0.8, 0],
        rotate: randoms.rotation + 720,
        scale: 1,
      }}
      transition={{
        duration: randoms.duration,
        delay: randoms.delay,
        ease: "linear",
      }}
      onAnimationComplete={() => onComplete(id)}
      className="absolute pointer-events-none z-0"
      style={{
        width: randoms.size,
        height: randoms.size * 0.8,
        background: 'radial-gradient(circle, #ffd1dc 0%, #ffb7c5 100%)',
        borderRadius: '50% 0 50% 50%',
        filter: 'blur(1px)',
        boxShadow: '0 0 10px rgba(255, 183, 197, 0.3)',
      }}
    />
  );
};

const SakuraPetals = ({ count = 20 }) => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Initial batch
    const newPetals = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
    }));
    setPetals(newPetals);
  }, [count]);

  const handleComplete = (id) => {
    setPetals((prev) => [
      ...prev.filter((p) => p.id !== id),
      { id: Date.now() + Math.random() },
    ]);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <AnimatePresence>
        {petals.map((petal) => (
          <SakuraPetal key={petal.id} id={petal.id} onComplete={handleComplete} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SakuraPetals;
