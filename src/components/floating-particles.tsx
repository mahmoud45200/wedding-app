import React from 'react';
import { motion } from 'motion/react';

// Floating Particles Component
export function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 sm:w-1 h-0.5 sm:h-1 bg-rose-400/30 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -20, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut' as const,
          }}
          style={{
            left: `${20 + i * 30}%`,
            top: '50%',
          }}
        />
      ))}
    </div>
  );
}
