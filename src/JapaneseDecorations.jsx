import React from 'react';
import { motion } from 'framer-motion';

const JapaneseDecorations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Hanging Lanterns (Chōchin) */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-between px-12 md:px-24 pt-4">
        {/* Left Lantern */}
        <motion.div 
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative origin-top"
        >
          {/* String */}
          <div className="w-px h-16 bg-rose-400/30 mx-auto"></div>
          {/* Lantern Body */}
          <div className="relative w-12 h-20 md:w-16 md:h-24 bg-rose-600/40 border border-rose-500/30 rounded-full flex flex-col justify-center items-center shadow-[0_0_30px_rgba(225,29,72,0.2)]">
             <div className="w-full h-px bg-rose-400/20 my-1"></div>
             <div className="w-full h-px bg-rose-400/20 my-1"></div>
             <div className="w-full h-px bg-rose-400/20 my-1"></div>
             <div className="w-full h-px bg-rose-400/20 my-1"></div>
             {/* Kanji Character (approximate 'Love' or 'Home') */}
             <span className="text-rose-100/90 text-lg md:text-xl font-serif">愛</span>
             {/* Inner Glow */}
             <div className="absolute inset-0 bg-rose-500/10 rounded-full animate-pulse"></div>
          </div>
          {/* Tassel */}
          <div className="w-0.5 h-8 bg-rose-500/40 mx-auto"></div>
        </motion.div>

        {/* Right Lantern */}
        <motion.div 
          animate={{ rotate: [2, -2, 2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="relative origin-top"
        >
          {/* String */}
          <div className="w-px h-20 bg-rose-200/30 mx-auto"></div>
          {/* Lantern Body */}
          <div className="relative w-14 h-24 md:w-20 md:h-32 bg-rose-100/10 border border-rose-200/20 rounded-[2rem] flex flex-col justify-center items-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
             <div className="w-full h-px bg-rose-100/20 my-2"></div>
             <div className="w-full h-px bg-rose-100/20 my-2"></div>
             <div className="w-full h-px bg-rose-100/20 my-2"></div>
             {/* Kanji Character */}
             <span className="text-rose-100/80 text-xl md:text-2xl font-serif">家</span>
             {/* Inner Glow */}
             <div className="absolute inset-0 bg-rose-100/10 animate-pulse"></div>
          </div>
          {/* Tassel */}
          <div className="w-0.5 h-12 bg-rose-200/40 mx-auto"></div>
        </motion.div>
      </div>

      {/* Japanese Traditional Patterns (Ukiran) */}
      <div className="absolute inset-x-0 bottom-0 py-12 flex justify-center opacity-10">
        <svg width="400" height="100" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Seigaiha (Wave) Pattern */}
          <defs>
            <pattern id="seigaiha" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 20C5 20 10 15 10 10C10 5 15 0 20 0C25 0 30 5 30 10C30 15 35 20 40 20" stroke="#ffb7c5" strokeWidth="0.5" fill="none"/>
              <path d="M0 15C5 15 10 10 10 5C10 0 15 -5 20 -5C25 -5 30 0 30 5C30 10 35 15 40 15" stroke="#ffb7c5" strokeWidth="0.2" fill="none"/>
            </pattern>
          </defs>
          <rect width="400" height="100" fill="url(#seigaiha)" />
        </svg>
      </div>

      {/* Corner Decorative Frames (Asanoha - Hemp Leaf) */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-[0.03] rotate-45 -translate-x-12 -translate-y-12">
         <svg width="200" height="200" viewBox="0 0 100 100">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="#ffb7c5" strokeWidth="0.5" fill="none" />
            <path d="M0 0 L100 100 M0 100 L100 0 M50 0 L50 100 M0 50 L100 50" stroke="#ffb7c5" strokeWidth="0.5" fill="none" />
         </svg>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] -rotate-45 translate-x-12 -translate-y-12">
         <svg width="200" height="200" viewBox="0 0 100 100">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="#ffb7c5" strokeWidth="0.5" fill="none" />
            <path d="M0 0 L100 100 M0 100 L100 0 M50 0 L50 100 M0 50 L100 50" stroke="#ffb7c5" strokeWidth="0.5" fill="none" />
         </svg>
      </div>
    </div>
  );
};

export default JapaneseDecorations;
