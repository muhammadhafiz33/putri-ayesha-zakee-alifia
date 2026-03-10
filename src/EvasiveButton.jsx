import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const EvasiveButton = ({ children, className = '', maxEvasions = 3, onCatch }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [evasionCount, setEvasionCount] = useState(0);

  const handleHoverEvent = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (evasionCount < maxEvasions) {
      // Generate random coordinates within a range.
      // Ensure it's far enough away to be "evasive"
      const newX = (Math.random() - 0.5) * 300; 
      const newY = (Math.random() - 0.5) * 300;

      setPosition({ x: newX, y: newY });
      setEvasionCount(prev => prev + 1);
    }
  };

  const handleClickEvent = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (evasionCount >= maxEvasions && onCatch) {
      onCatch();
    } else if (evasionCount < maxEvasions) {
       handleHoverEvent(e);
    }
  };

  return (
    <motion.button
      onHoverStart={handleHoverEvent}
      onMouseEnter={handleHoverEvent}
      onTouchStart={handleClickEvent} // Touch start acts as a tap/click on mobile
      onTouchMove={handleHoverEvent} // Dragging respects evasion
      onClick={handleClickEvent} // Explicit click triggers the catch
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-full px-8 py-4 font-bold text-white overflow-hidden bg-rose-600/50 backdrop-blur-md border border-rose-500 hover:bg-rose-500/80 ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default EvasiveButton;
