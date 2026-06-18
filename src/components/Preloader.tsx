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
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', duration: 1.2, bounce: 0.4 }}
            className="text-spidey-red w-32 h-32 mb-10 drop-shadow-[0_0_25px_rgba(227,28,28,0.7)] select-none"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <ellipse cx="50" cy="40" rx="8" ry="12" />
              <ellipse cx="50" cy="65" rx="12" ry="20" />
              <path d="M 45 35 Q 25 10 5 25" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 45 40 Q 20 25 5 45" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 42 60 Q 20 65 10 90" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 45 70 Q 30 90 20 100" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 55 35 Q 75 10 95 25" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 55 40 Q 80 25 95 45" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 58 60 Q 80 65 90 90" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 55 70 Q 70 90 80 100" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
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
