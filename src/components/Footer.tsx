export const Footer = () => {
  return (
    <footer className="relative w-full border-t border-white/[0.07] bg-[#050A14]/98 px-8 md:px-12 py-8 md:py-10 flex flex-col md:flex-row justify-between items-center gap-6 z-20">
      
      {/* TOP BORDER GLOW */}
      <div 
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(227,28,28,0.5), transparent)' }}
      />

      {/* Left: Logo */}
      <a href="#" className="flex items-center gap-3 group no-underline" data-cursor>
        <div className="w-8 h-8 text-spidey-red border-2 border-spidey-red flex items-center justify-center transition-transform duration-300 group-hover:rotate-[60deg]">
          {/* Custom Hexagon / Spider motif */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span className="font-orbitron font-bold tracking-widest text-[1rem] text-white uppercase">
          Spider<span className="text-spidey-red">·</span>Man
        </span>
      </a>

      {/* Center: Copyright */}
      <div className="text-white/25 text-[0.8rem] font-inter text-center">
        © 2025 · Marvel Comics · All Rights Reserved
      </div>

      {/* Right: Links */}
      <div className="flex items-center gap-6">
        {['Privacy', 'Comics', 'Universe'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-white/30 hover:text-white text-[0.82rem] font-inter uppercase tracking-wider transition-colors duration-300 no-underline"
            data-cursor
          >
            {link}
          </a>
        ))}
      </div>

    </footer>
  );
};

export default Footer;
