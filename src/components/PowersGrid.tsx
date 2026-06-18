import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const powers = [
  { 
    icon: '🕸️', 
    title: 'Web-Slinging',
    desc: 'Engineered web-fluid shooters producing tensile-strength threads stronger than steel. Swing at 60mph through Manhattan.',
    stat: '60 MPH'
  },
  { 
    icon: '⚡', 
    title: 'Spider-Sense',
    desc: 'Precognitive danger detection warns of threats milliseconds before impact. Zero blind spots, zero ambushes.',
    stat: '360°'
  },
  { 
    icon: '🧲', 
    title: 'Wall-Crawling',
    desc: 'Molecular electrostatic adhesion to any surface — glass, steel, ice. Supports full body weight at any angle.',
    stat: '10 TONS'
  },
  { 
    icon: '💪', 
    title: 'Super Strength',
    desc: 'Lift capacity exceeds 50 tons. Single punch force equivalent to a freight train at full velocity.',
    stat: '50 TONS'
  },
  { 
    icon: '🧬', 
    title: 'Rapid Healing',
    desc: 'Accelerated cellular regeneration. Minor wounds close in minutes, broken bones in days. Toxin resistance level 9.',
    stat: '10X'
  },
  { 
    icon: '🧠', 
    title: 'Genius Intellect',
    desc: 'Master biochemist and mechanical engineer. Self-designed web-shooters, Spider-Tracer tech, and combat AI systems.',
    stat: 'IQ 250+'
  }
];

export const PowersGrid = () => {
  return (
    <section id="powers" className="relative w-full py-32 px-6 z-20 bg-[#050A14] overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-spidey-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <div className="font-rajdhani font-bold text-spidey-red tracking-[0.3em] uppercase mb-4 text-xs">
            Enhanced Genetics
          </div>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white mb-6 uppercase tracking-tight">
            Superhuman Capabilities
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {powers.map((power, idx) => (
            <PowerCard key={power.title} power={power} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

const PowerCard = ({ power, index }: { power: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12.5deg", "-12.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12.5deg", "12.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative w-full h-full bg-[#0a101d] border border-white/5 rounded-2xl p-8 cursor-crosshair"
      >
        {/* Glow behind card */}
        <div className="absolute inset-0 bg-gradient-to-br from-spidey-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10" />
        
        {/* Border gradient on hover */}
        <div className="absolute inset-0 border border-spidey-red/0 group-hover:border-spidey-red/40 transition-colors duration-500 rounded-2xl pointer-events-none" />

        <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-2xl border border-white/10 group-hover:border-spidey-red/40 group-hover:bg-spidey-red/10 transition-all duration-300">
              {power.icon}
            </div>
            <div className="font-orbitron font-bold text-xs text-spidey-red tracking-wider bg-spidey-red/10 px-3 py-1 rounded-full border border-spidey-red/20">
              {power.stat}
            </div>
          </div>

          <h3 className="font-rajdhani font-bold text-2xl text-white uppercase tracking-wider mb-3">
            {power.title}
          </h3>
          <p className="font-inter font-light text-white/50 leading-relaxed text-sm">
            {power.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
