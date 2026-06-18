import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useScrollVelocity } from '../hooks/useScrollVelocity';

export const OriginStory = () => {
  const { velocity, direction } = useScrollVelocity();
  const spiderControls = useAnimation();

  // On scroll down trigger spider spin
  useEffect(() => {
    if (direction === 'down' && velocity > 15) {
      spiderControls.start({
        rotate: 360,
        transition: { type: 'spring', stiffness: 200, damping: 20 }
      }).then(() => {
        // Reset invisibly so it can trigger again
        spiderControls.set({ rotate: 0 });
      });
    }
  }, [direction, velocity, spiderControls]);

  // Calculate speed multiplier for rings based on scroll velocity
  const speed = 1 + Math.min(Math.abs(velocity) * 0.15, 8);

  const dots = Array.from({ length: 8 });

  return (
    <section id="origin" className="relative w-full py-32 px-6 z-20 bg-spidey-dark overflow-hidden">
      <style>{`
        @keyframes spinCW {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spinCCW {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        .ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
        }
        .ring-1 { --ring-radius: 150px; }
        @media (min-width: 768px) {
          .ring-1 { --ring-radius: 200px; }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-8">
        
        {/* LEFT SIDE - Visual Animation */}
        <div className="w-full md:w-1/2 h-[350px] md:h-[500px] relative flex items-center justify-center">
          
          {/* RINGS */}
          <div 
            className="ring ring-1 border border-spidey-red/20 w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
            style={{ animation: `spinCW calc(22s / ${speed}) linear infinite` }}
          >
            {/* 8 Dots on Ring 1 */}
            {dots.map((_, i) => (
              <div 
                key={i}
                className="absolute bg-spidey-red rounded-full shadow-[0_0_10px_#E31C1C]"
                style={{
                  width: '6px', height: '6px',
                  top: '50%', left: '50%',
                  marginTop: '-3px', marginLeft: '-3px',
                  transform: `rotate(${i * 45}deg) translateX(var(--ring-radius))`
                }}
              />
            ))}
          </div>
          
          <div 
            className="ring border-dashed border-spidey-red/15 w-[220px] h-[220px] md:w-[300px] md:h-[300px]"
            style={{ 
              borderWidth: '1px',
              animation: `spinCCW calc(16s / ${speed}) linear infinite` 
            }}
          />
          
          <div 
            className="ring border border-spidey-red/25 w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
            style={{ animation: `spinCW calc(9s / ${speed}) linear infinite` }}
          />
          
          <div 
            className="ring border-dotted border-white/10 w-[90px] h-[90px] md:w-[120px] md:h-[120px]"
            style={{ 
              borderWidth: '1px',
              animation: `spinCCW calc(6s / ${speed}) linear infinite` 
            }}
          />

          {/* CENTER SPIDER */}
          <motion.div
            animate={spiderControls}
            className="absolute z-10 w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full border-2 border-spidey-red flex items-center justify-center text-4xl md:text-[3.5rem]"
            style={{
              background: 'radial-gradient(circle at center, rgba(227,28,28,0.3) 0%, rgba(13,21,32,1) 80%)',
              boxShadow: '0 0 40px rgba(227,28,28,0.4), inset 0 0 30px rgba(227,28,28,0.15)'
            }}
          >
            {/* Infinite float & pulse */}
            <motion.div
              animate={{ 
                y: [0, -18, -9, 0],
                rotate: [0, 3, -2, 0],
                scale: [1, 1.04, 1.01, 1],
                boxShadow: [
                  '0 0 20px rgba(227,28,28,0.3)',
                  '0 0 60px rgba(227,28,28,0.8)',
                  '0 0 40px rgba(227,28,28,0.5)',
                  '0 0 20px rgba(227,28,28,0.3)'
                ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-full h-full flex items-center justify-center rounded-full"
            >
              <span role="img" aria-label="spider">🕷️</span>
            </motion.div>
          </motion.div>
          
        </div>

        {/* RIGHT SIDE - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-rajdhani font-bold text-spidey-red tracking-[0.2em] uppercase mb-4"
          >
            Origin Story
          </motion.div>

          <h2 className="font-orbitron font-black text-4xl md:text-5xl leading-tight text-white mb-6 uppercase tracking-tight">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              The Spider That
            </motion.div>
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-spidey-red"
            >
              Changed Everything
            </motion.div>
          </h2>

          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-white/50 leading-relaxed text-[1.05rem] mb-8 max-w-[500px]"
          >
            Peter Parker, a brilliant but socially awkward Queens high school student, 
            attended a public science exhibit where he was bitten by a radioactive arachnid. 
            Overnight, he developed spectacular abilities mirroring those of a spider.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative border-l-[3px] border-spidey-red pl-6 py-2 mb-12"
          >
            <div className="absolute -top-6 -left-2 text-[6rem] font-orbitron font-black text-white/5 leading-none select-none">
              "
            </div>
            <p className="relative font-inter italic text-white/80 text-[1.05rem] z-10">
              With great power there must also come — great responsibility.
            </p>
          </motion.div>

          {/* MINI STATS ROW */}
          <div className="flex flex-wrap gap-8 md:gap-12">
            {[
              { val: "1962", lbl: "First Appearance" },
              { val: "Queens", lbl: "New York City" },
              { val: "#1", lbl: "Ranked Hero" }
            ].map((stat, i) => (
              <motion.div 
                key={stat.lbl}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.4 + i * 0.1, 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 22 
                }}
                className="flex flex-col"
              >
                <span className="font-orbitron font-bold text-spidey-red text-xl md:text-2xl mb-1">
                  {stat.val}
                </span>
                <span className="font-inter text-[0.65rem] text-white/40 tracking-[0.1em] uppercase">
                  {stat.lbl}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default OriginStory;
