import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMouseMagnetic } from '../hooks/useMouseMagnetic';

export const CTASection = () => {
  const { ref: primaryRef, x: pX, y: pY } = useMouseMagnetic(0.2, 150);
  const { ref: outlineRef, x: oX, y: oY } = useMouseMagnetic(0.15, 120);

  // Ripple effect state
  const [ripple, setRipple] = useState<{ x: number, y: number, id: number }[]>([]);
  
  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipple([...ripple, { x, y, id }]);
    setTimeout(() => {
      setRipple(prev => prev.filter(r => r.id !== id));
    }, 600);
  };

  const words = "Become Part of the".split(" ");
  // Pre-calculated scatter values for hydration consistency
  const scatters = [
    { x: -60, y: -40, r: -12 },
    { x: 40, y: 30, r: 10 },
    { x: -20, y: 50, r: -8 },
    { x: 70, y: -20, r: 15 }
  ];

  return (
    <section id="contact" className="relative w-full py-40 px-6 bg-[#050A14] overflow-hidden flex flex-col items-center justify-center text-center z-10">
      
      {/* Background Radial Glow (Scroll Expanding) */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ background: 'radial-gradient(circle 0px at center, rgba(227,28,28,0.2) 0%, transparent 100%)' }}
        whileInView={{ background: 'radial-gradient(circle 600px at center, rgba(227,28,28,0.15) 0%, transparent 100%)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />

      {/* Floating Web Emoji */}
      <motion.div
        className="absolute bottom-[3rem] right-[3rem] text-[9rem] opacity-[0.07] z-0 pointer-events-none select-none"
        animate={{ 
          y: [0, -25, -10, 0],
          rotate: [0, 8, -5, 0],
          scale: [1, 1.05, 0.98, 1]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
      >
        <span role="img" aria-label="web">🕸️</span>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center">
        {/* LABEL */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-rajdhani font-bold text-spidey-red tracking-[0.2em] uppercase mb-6"
        >
          JOIN THE MISSION
        </motion.div>

        {/* TITLE */}
        <h2 className="font-orbitron font-black text-4xl md:text-[clamp(3rem,6vw,5.5rem)] leading-none text-white mb-6 uppercase tracking-tight flex flex-col items-center gap-2">
          
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ 
                  x: scatters[i].x, 
                  y: scatters[i].y, 
                  rotate: scatters[i].r, 
                  opacity: 0 
                }}
                whileInView={{ 
                  x: 0, 
                  y: 0, 
                  rotate: 0, 
                  opacity: 1 
                }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.15, 
                  duration: 0.9, 
                  type: 'spring', 
                  stiffness: 120, 
                  damping: 14 
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.9, type: 'spring' }}
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 20px rgba(227,28,28,0.4)',
                  '0 0 60px rgba(227,28,28,0.8)',
                  '0 0 20px rgba(227,28,28,0.4)'
                ]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #E31C1C, #ff5555)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Web
            </motion.span>
          </motion.div>
        </h2>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="font-inter text-white/50 leading-relaxed max-w-[460px] text-center mb-12"
        >
          Your friendly neighborhood journey awaits. Equip the suit, discover your abilities, and protect the city.
        </motion.p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <motion.a
              ref={primaryRef as any}
              style={{ x: pX, y: pY }}
              href="#suitup"
              onClick={handleRipple}
              className="relative overflow-hidden inline-flex items-center gap-2 bg-spidey-red text-white px-10 py-4 font-rajdhani font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-[0_10px_35px_rgba(227,28,28,0.55)] rounded-sm no-underline"
              data-cursor
            >
              <span role="img" aria-label="suit">🕷️</span> Suit Up Now
              {ripple.map(r => (
                <motion.span
                  key={r.id}
                  initial={{ scale: 0, opacity: 0.3 }}
                  animate={{ scale: 5, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute bg-white/30 rounded-full w-20 h-20 pointer-events-none"
                  style={{ top: r.y - 40, left: r.x - 40 }}
                />
              ))}
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <motion.a
              ref={outlineRef as any}
              style={{ x: oX, y: oY }}
              href="#comics"
              className="inline-flex items-center bg-transparent text-white border border-white/25 px-10 py-4 font-rajdhani font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:border-spidey-red hover:text-spidey-red rounded-sm no-underline"
              data-cursor
            >
              Explore Comics →
            </motion.a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
