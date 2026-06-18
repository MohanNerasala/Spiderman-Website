
import { motion, useScroll, MotionConfig } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Preloader from './components/Preloader';

// Import new sections
import PowersSection from './sections/PowersSection';
import OriginSection from './sections/OriginSection';
import ArsenalSection from './sections/ArsenalSection';
import TimelineSection from './sections/TimelineSection';
import StatsSection from './sections/StatsSection';
import ContactSection from './sections/ContactSection';

export const App = () => {
  const { scrollYProgress } = useScroll();
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "user"}>
      <Preloader />
      <>
        <CustomCursor />
        
        {/* Full Website Background Video */}
        <div className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none overflow-hidden bg-[#050A14] transform-gpu" style={{ willChange: 'transform' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70 scale-[1.15] origin-bottom transform-gpu"
            style={{ willChange: 'transform' }}
          >
            <source src="/assets/background%20video.mp4" type="video/mp4" />
          </video>
          {/* Vignette/gradient overlay for better text readability */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#050A14]/40 via-transparent to-[#050A14]/40" />
        </div>
        
        
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-spidey-red z-[9999] origin-left pointer-events-none"
          style={{ scaleX: scrollYProgress, willChange: 'transform' }}
        />

        <main style={{ position: 'relative', zIndex: 2 }}>
          <Navbar />
          <HeroSection />
          <PowersSection />
          <OriginSection />
          <ArsenalSection />
          <TimelineSection />
          <StatsSection />
          <ContactSection />
        </main>
      </>
    </MotionConfig>
  );
};

export default App;
