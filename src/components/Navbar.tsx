import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMouseMagnetic } from '../hooks/useMouseMagnetic';
import { useScrollSpy } from '../hooks/useScrollSpy';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { ref: ctaRef, x: ctaX, y: ctaY } = useMouseMagnetic(0.15);

  const activeSection = useScrollSpy(['powers', 'origin', 'arsenal', 'timeline', 'contact']);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Powers', href: '#powers', id: 'powers' },
    { name: 'Origin', href: '#origin', id: 'origin' },
    { name: 'Arsenal', href: '#arsenal', id: 'arsenal' },
    { name: 'Timeline', href: '#timeline', id: 'timeline' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-[100]"
        style={{
          background: scrolled ? 'rgba(5, 10, 20, 0.98)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'background-color 0.4s ease, border-color 0.4s ease',
          willChange: 'transform, background-color'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-[64px] md:h-[84px] flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <a href="#" className="flex items-center group no-underline shrink-0 nav-logo-margin" data-cursor>
              <div className="font-orbitron font-bold text-[1.35rem] leading-none tracking-[0.15em] text-white flex items-center -translate-y-[2px] transition-transform duration-300 group-hover:scale-[1.02]">
                SPIDER<span className="text-spidey-red">·MAN</span>
              </div>
            </a>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center h-full gap-6 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative font-rajdhani font-semibold text-[0.85rem] tracking-[0.15em] uppercase transition-colors duration-300 flex items-center h-full group ${isActive ? 'text-spidey-red' : 'text-white/60 hover:text-white'}`}
                  data-cursor
                >
                  <span className="pt-1">{link.name}</span>
                  <span className={`absolute bottom-6 left-0 w-full h-[2px] ${isActive ? 'bg-spidey-red scale-x-100' : 'bg-white scale-x-0 group-hover:scale-x-100'} origin-left transition-transform duration-300 ease-out`} />
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex flex-1 justify-end items-center shrink-0">
            <motion.a
              ref={ctaRef as any}
              style={{ x: ctaX, y: ctaY }}
              href="#contact"
              className="relative inline-flex items-center justify-center h-11 px-10 min-w-[220px] font-rajdhani font-bold text-white text-[0.85rem] tracking-[0.15em] uppercase rounded-sm border border-spidey-red/40 bg-spidey-red/10 transition-all duration-300 hover:bg-spidey-red hover:border-spidey-red hover:shadow-[0_0_20px_rgba(227,28,28,0.5)] overflow-hidden group no-underline translate-x-16"
              data-cursor
            >
              {/* Button Hover Shine */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10 flex items-center justify-center gap-3 pt-1 w-full">
                Enter the Web <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
              </span>
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-[110] text-white -translate-y-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`bg-white h-[2px] w-6 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1.5'}`} />
            <span className={`bg-white h-[2px] w-6 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`bg-white h-[2px] w-6 rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] md:hidden backdrop-blur-xl bg-[#050A14]/95"
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-rajdhani font-bold text-2xl tracking-[0.2em] uppercase transition-colors duration-300 relative group flex items-center ${isActive ? 'text-spidey-red' : 'text-white/70 hover:text-white'}`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-2 left-0 w-full h-[2px] ${isActive ? 'bg-spidey-red scale-x-100' : 'bg-spidey-red scale-x-0 group-hover:scale-x-100'} origin-left transition-transform duration-300 ease-out`} />
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-10 relative flex items-center justify-center w-[85vw] max-w-[320px] h-[60px] bg-spidey-red text-white font-rajdhani font-bold text-[1.15rem] tracking-[0.2em] uppercase rounded-sm shadow-[0_0_30px_rgba(227,28,28,0.4)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center w-full">
                  ENTER THE WEB <span className="ml-4 text-2xl transition-transform -translate-y-[1px]">→</span>
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
