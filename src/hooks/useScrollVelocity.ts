import { useState, useEffect } from 'react';

export const useScrollVelocity = () => {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    velocity: 0,
    direction: 'down' as 'up' | 'down',
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const velocity = currentScrollY - lastScrollY;
      const direction = velocity > 0 ? 'down' : 'up';
      
      setScrollState({
        scrollY: currentScrollY,
        velocity,
        direction,
      });
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollState;
};
