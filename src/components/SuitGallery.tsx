import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const suits = [
  {
    id: 'classic',
    name: 'Advanced Suit 2.0',
    desc: 'The definitive Spidey experience. Nanotech infused with classic web-shooter mechanics. A perfect blend of stark engineering and Parker ingenuity.',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1600&q=80',
    year: '2023'
  },
  {
    id: 'symbiote',
    name: 'Symbiote Surge',
    desc: 'Aggressive, powerful, and fluid. The alien symbiote bonds with the host to unleash raw, uncontrollable power and enhanced agility.',
    image: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=1600&q=80',
    year: '1984'
  },
  {
    id: 'miles',
    name: 'Brooklyn Visions',
    desc: 'Bio-electric venom blasts and optical camouflage. The protector of Brooklyn brings an entirely new moveset to the table.',
    image: 'https://images.unsplash.com/photo-1512413914421-422119f9f8c6?auto=format&fit=crop&w=1600&q=80',
    year: '2011'
  }
];

export const SuitGallery = () => {
  return (
    <section id="suits" className="relative w-full bg-[#050A14] py-32 md:py-48 z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-24 md:mb-40 flex flex-col items-center text-center">
          <div className="font-rajdhani font-bold text-spidey-red tracking-[0.4em] uppercase mb-4 text-xs">
            Mark VI Protocol
          </div>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl text-white uppercase tracking-tighter">
            Suit Database
          </h2>
        </div>

        <div className="flex flex-col gap-32 md:gap-48">
          {suits.map((suit, idx) => (
            <SuitCard key={suit.id} suit={suit} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

const SuitCard = ({ suit, index }: { suit: any, index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the image inside the container
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  // Scale effect for the image wrapper
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full flex flex-col md:flex-row items-center gap-12 md:gap-24 ${!isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Image Container with Parallax */}
      <motion.div 
        style={{ scale }}
        className="relative w-full md:w-3/5 aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-sm bg-[#0a101d]"
      >
        <motion.div 
          className="absolute inset-0 w-full h-[140%] -top-[20%]"
          style={{ y }}
        >
          <img 
            src={suit.image} 
            alt={suit.name} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent opacity-60" />
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <div className="w-full md:w-2/5 flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-rajdhani font-bold text-spidey-red tracking-[0.3em] uppercase mb-4 text-sm">
            Est. {suit.year}
          </div>
          <h3 className="font-orbitron font-black text-4xl md:text-5xl text-white uppercase mb-6 leading-none tracking-tight">
            {suit.name}
          </h3>
          <p className="font-inter font-light text-white/50 text-base md:text-lg leading-relaxed max-w-md">
            {suit.desc}
          </p>

          <motion.button
            whileHover={{ scale: 1.05, letterSpacing: '0.2em' }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 border border-white/20 px-8 py-4 font-rajdhani uppercase tracking-[0.15em] text-xs text-white hover:bg-spidey-red hover:border-spidey-red hover:text-white transition-all duration-300"
          >
            Deploy Suit
          </motion.button>
        </motion.div>
      </div>

    </div>
  );
};
