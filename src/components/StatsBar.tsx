import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const stats = [
  { value: 62, suffix: '+', label: 'Years Active' },
  { value: 900, suffix: '+', label: 'Villains Defeated' },
  { value: 50, suffix: 'T', label: 'Tons of Strength' },
  { value: 200, suffix: '+', label: 'MPH Swing Speed' }
];

const StatItem = ({ stat, index }: { stat: typeof stats[0], index: number }) => {
  const { ref, hasBeenVisible } = useIntersectionObserver(0.5);
  const [displayValue, setDisplayValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!hasBeenVisible) return;
    
    let startTime: number;
    let requestRef: number;
    
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const deltaTime = time - startTime;
      const progress = deltaTime / 2000;
      
      // Cubic ease out: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - Math.min(progress, 1), 3);
      setDisplayValue(Math.floor(eased * stat.value));
      
      if (progress < 1) {
        requestRef = requestAnimationFrame(animate);
      } else {
        setDisplayValue(stat.value);
        setIsComplete(true);
      }
    };
    
    requestRef = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef);
  }, [hasBeenVisible, stat.value]);

  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="flex flex-col items-center justify-center relative group w-full md:w-1/4 py-6 md:py-0"
    >
      <div className="flex items-baseline mb-2">
        <span 
          className="font-orbitron font-black text-[clamp(2.8rem,5vw,4.2rem)] leading-none text-spidey-red transition-all duration-300 group-hover:[text-shadow:0_0_30px_rgba(227,28,28,0.6)]"
        >
          {displayValue}
        </span>
        <span className="font-orbitron font-bold text-[clamp(1.5rem,3vw,2.2rem)] text-spidey-red inline-block min-w-[35px] text-left ml-1">
          {isComplete ? (
            <motion.span
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 12 }}
              className="inline-block"
            >
              {stat.suffix}
            </motion.span>
          ) : (
            <span className="opacity-0 inline-block">{stat.suffix}</span>
          )}
        </span>
      </div>
      <div className="font-inter text-[0.78rem] text-white/40 tracking-[0.18em] uppercase text-center">
        {stat.label}
      </div>
    </motion.div>
  );
};

export const StatsBar = () => {
  return (
    <motion.section
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative w-full z-20"
      style={{
        background: 'linear-gradient(135deg, rgba(227,28,28,0.08), rgba(227,28,28,0.04))',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              <StatItem stat={stat} index={index} />
              
              {/* Vertical Divider */}
              {index !== stats.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="hidden md:block w-[1px] h-20 bg-white/[0.08] origin-top"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsBar;
