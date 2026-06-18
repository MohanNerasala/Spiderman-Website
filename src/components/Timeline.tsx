import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

const events = [
  {
    year: '1962',
    title: 'Amazing Fantasy #15',
    desc: 'Peter Parker debuts. Created by Stan Lee and Steve Ditko. Marvel\'s most relatable hero is born in Queens, New York.'
  },
  {
    year: '1984', 
    title: 'The Black Symbiote Suit',
    desc: 'During Secret Wars, Spider-Man bonds with an alien organism. The black suit grants unlimited power — and darker instincts.'
  },
  {
    year: '2002',
    title: 'Silver Screen Debut', 
    desc: 'Tobey Maguire swings into cinemas. Sam Raimi\'s trilogy grosses $2.5B and defines a generation of fans.'
  },
  {
    year: '2018',
    title: 'Into the Spider-Verse',
    desc: 'Miles Morales takes the mantle. Academy Award winning. Revolutionary visual style redefines animation forever.'
  },
  {
    year: '2021',
    title: 'No Way Home',
    desc: 'Three Spider-Men unite across the Multiverse. $1.9 billion worldwide. The most emotional Spider-Man film in history.'
  }
];

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this timeline container specifically to draw the red line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  return (
    <section id="timeline" className="relative w-full py-32 px-6 bg-spidey-dark overflow-hidden z-20">
      <style>{`
        @keyframes dotPulse {
          0% { box-shadow: 0 0 0 0 rgba(227,28,28,0.6); }
          70% { box-shadow: 0 0 0 10px rgba(227,28,28,0); }
          100% { box-shadow: 0 0 0 0 rgba(227,28,28,0); }
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <div className="font-rajdhani font-bold text-spidey-red tracking-[0.2em] uppercase mb-4 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-spidey-red/50"></span>
            HISTORY
            <span className="w-12 h-[1px] bg-spidey-red/50"></span>
          </div>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white mb-6 uppercase tracking-tight">
            The Spider Legacy
          </h2>
          <p className="font-inter text-white/50 leading-relaxed max-w-[520px]">
            Tracing the evolution of a pop culture phenomenon across six decades 
            of comics, cinema, and history.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full">
          
          {/* VERTICAL RED LINE (Scroll-Driven Reveal) */}
          <motion.div 
            className="absolute left-[24px] top-0 bottom-0 w-[1.5px] origin-top z-0"
            style={{ 
              background: 'linear-gradient(180deg, #E31C1C 0%, rgba(227,28,28,0.3) 100%)',
              scaleY: scrollYProgress
            }}
          />

          {/* EVENTS LIST */}
          <div className="flex flex-col relative z-10">
            {events.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
                }}
                className="relative pl-[70px] mb-14"
              >
                {/* Red Dot (Pulses infinitely after popping in) */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute left-[17px] top-[8px] w-[18px] h-[18px] bg-spidey-red rounded-full border-2 border-[#050A14]"
                  style={{
                    animation: `dotPulse 2s infinite`,
                    animationDelay: `${index * 0.4}s`
                  }}
                />

                {/* YEAR - Wipe Reveal Animation via clip-path */}
                <motion.div
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.15 + 0.2, duration: 0.5, ease: 'easeOut' }}
                  className="font-orbitron font-bold text-spidey-red text-[0.82rem] tracking-[0.12em] mb-[0.4rem] inline-block"
                >
                  {event.year}
                </motion.div>

                {/* Content */}
                <h3 className="font-rajdhani font-bold text-white text-[1.35rem] tracking-wide mb-[0.4rem] uppercase">
                  {event.title}
                </h3>
                
                <p className="font-inter text-[0.9rem] text-white/45 leading-[1.7] max-w-[480px]">
                  {event.desc}
                </p>

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Timeline;
