import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, onClick, className = '' }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // the divisor controls the "strength" of the attraction
    setPosition({ x: x / 3, y: y / 3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative rounded-full px-8 py-4 font-bold text-white overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, #10b981, #059669)', // Emerald green
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.3)',
      }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16, 185, 129, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.5)' }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default MagneticButton;
