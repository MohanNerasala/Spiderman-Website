import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show on first visit
    const hasVisited = sessionStorage.getItem('spidey_visited');
    if (hasVisited) {
      setIsVisible(false);
      return;
    }

    sessionStorage.setItem('spidey_visited', 'true');

    // Fake loading progress
    const start = Date.now();
    const duration = 1800; // 1.8s

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setIsVisible(false), 200);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] bg-[#050A14] flex flex-col items-center justify-center pointer-events-auto"
        >
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1, bounce: 0.5 }}
            className="text-spidey-red text-[6rem] mb-10 drop-shadow-[0_0_20px_rgba(227,28,28,0.5)] select-none"
          >
            <span role="img" aria-label="spider">🕷️</span>
          </motion.div>
          
          <div className="w-[200px] h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-spidey-red shadow-[0_0_10px_#E31C1C]"
              style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            />
          </div>
          
          <div className="mt-4 font-orbitron font-bold text-spidey-red tracking-widest text-sm">
            {Math.round(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
