import { motion } from 'framer-motion';
import { useMemo } from 'react';

export const SectionParticles = () => {
  // Precompute random values to avoid hydration errors
  const particles = useMemo(() => Array.from({ length: 12 }).map(() => ({
    x: Math.random() * 80 - 40 + 'vw', // -40vw to 40vw
    y: Math.random() * 80 - 40 + 'px',
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2
  })), []);

  return (
    <div className="relative w-full h-24 overflow-hidden flex items-center justify-center pointer-events-none z-10 opacity-30">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-spidey-red rounded-full"
          style={{ width: p.size, height: p.size, left: `calc(50% + ${p.x})` }}
          animate={{
            y: ['0px', p.y, '0px'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

export default SectionParticles;
