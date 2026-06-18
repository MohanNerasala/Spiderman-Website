import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroSection = () => {
  
  // Parallax scroll effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const title = "SPIDER-MAN";

  // GOD MODE Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.5,
      }
    }
  };

  const charVars = {
    hidden: { 
      y: "120%", 
      rotateX: -90, 
      opacity: 0,
      scale: 0.8
    },
    show: { 
      y: "0%", 
      rotateX: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] as any // Ultra-smooth cinematic ease
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <motion.div 
        className="relative z-10 flex flex-col items-center text-center px-4 w-full mt-52 sm:mt-48"
        style={{ y: y1, opacity }}
      >
        {/* Expanding Tracking Subtitle */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0em', y: 10 }}
          animate={{ opacity: 1, letterSpacing: '0.6em', y: 0 }}
          transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="font-rajdhani font-medium text-white/60 uppercase text-xs md:text-sm mb-6 ml-[0.6em]"
        >
          Marvel Studios
        </motion.div>

        {/* God Mode 3D Staggered Title with Chromatic Shadow */}
        <div className="relative mb-8">
          {/* Main Bright White Layer */}
          <motion.h1
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="font-orbitron font-black text-white text-[10.5vw] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.9] tracking-[0.05em] flex justify-center flex-nowrap whitespace-nowrap relative z-20"
            style={{
              textShadow: '0 15px 50px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(255, 255, 255, 0.3)',
              transformStyle: 'preserve-3d',
            }}
          >
            {title.split('').map((char, i) => (
              <span key={i} className="overflow-hidden inline-block px-[2px] py-2">
                <motion.span
                  variants={charVars}
                  className="inline-block origin-bottom"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {char === '-' ? <span className="mx-1 sm:mx-2 opacity-50">-</span> : char}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Deep Red Chromatic Offset Layer */}
          <motion.h1
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="font-orbitron font-black text-spidey-red text-[10.5vw] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.9] tracking-[0.05em] flex justify-center flex-nowrap whitespace-nowrap absolute top-[3px] left-[3px] md:top-[6px] md:left-[6px] w-full pointer-events-none z-10 blur-[2px] opacity-80"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {title.split('').map((char, i) => (
              <span key={`shadow-${i}`} className="overflow-hidden inline-block px-[2px] py-2">
                <motion.span
                  variants={charVars}
                  className="inline-block origin-bottom"
                >
                  {char === '-' ? <span className="mx-1 sm:mx-2 opacity-50">-</span> : char}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>



      </motion.div>
    </section>
  );
};

export default HeroSection;
