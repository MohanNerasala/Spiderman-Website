import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

const TRAIL_LENGTH = 10;
const TRAIL_LIFETIME = 400; // ms

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const ringWrapperRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailLinesRef = useRef<(SVGLineElement | null)[]>([]);

  // Position state (refs to avoid re-renders)
  const mouseRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const ringPosRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const trailRef = useRef<Point[]>([]);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const checkMobile = window.matchMedia('(pointer: coarse)').matches;
    setIsMobile(checkMobile);
    
    if (!checkMobile) {
      document.body.style.cursor = 'none';
    }

    const updatePosition = (clientX: number, clientY: number) => {
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;

      if (dotRef.current && !checkMobile) {
        dotRef.current.style.transform = `translate(calc(-50% + ${clientX}px), calc(-50% + ${clientY}px))`;
      }

      trailRef.current.push({ x: clientX, y: clientY, timestamp: performance.now() });
      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.shift();
      }
    };

    const onPointerMove = (e: PointerEvent) => updatePosition(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onPointerDown = () => setIsClicking(true);
    const onPointerUp = () => setIsClicking(false);

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    const animate = (time: number) => {
      // 1. Ring Physics (smooth lag via lerp) - skip on mobile
      if (!checkMobile) {
        ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.1;
        ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.1;

        if (ringWrapperRef.current) {
          ringWrapperRef.current.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px)`;
        }
      }

      // 2. Web Strand Trail Physics
      trailRef.current = trailRef.current.filter(p => time - p.timestamp < TRAIL_LIFETIME);

      trailLinesRef.current.forEach((line, i) => {
        if (!line) return;
        if (i < trailRef.current.length - 1) {
          const p1 = trailRef.current[i];
          const p2 = trailRef.current[i + 1];
          const age = time - p2.timestamp;
          
          const opacity = Math.max(0, 1 - age / TRAIL_LIFETIME) * 0.3;

          line.setAttribute('x1', p1.x.toString());
          line.setAttribute('y1', p1.y.toString());
          line.setAttribute('x2', p2.x.toString());
          line.setAttribute('y2', p2.y.toString());
          line.style.opacity = opacity.toString();
          line.style.display = 'block';
        } else {
          line.style.display = 'none';
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Set up hover detection
  useEffect(() => {
    if (isMobile) return; // skip hover effects on mobile
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const attachListeners = () => {
      const elements = document.querySelectorAll('a, button, [data-cursor]');
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return elements;
    };

    let elements = attachListeners();

    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      elements = attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMobile]);

  return (
    <>
      {/* Web Strand Trail (Renders even on mobile touch) */}
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      >
        {Array.from({ length: TRAIL_LENGTH - 1 }).map((_, i) => (
          <line
            key={i}
            ref={(el) => { trailLinesRef.current[i] = el; }}
            stroke="rgba(227, 28, 28, 1)"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ display: 'none', transition: 'none' }}
          />
        ))}
      </svg>

      {/* Hide traditional cursor elements on mobile */}
      {!isMobile && (
        <>
          <div
            ref={ringWrapperRef}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              zIndex: 9999,
              width: 0,
              height: 0,
              willChange: 'transform',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: isHovering ? '44px' : '22px',
                height: isHovering ? '44px' : '22px',
                border: `2px solid ${isHovering ? 'white' : '#E31C1C'}`,
                backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                borderRadius: '50%',
                transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
                transition: 'width 0.2s, height 0.2s, border-color 0.2s, background-color 0.2s, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: isHovering ? 'none' : '0 0 10px rgba(227, 28, 28, 0.5)',
                mixBlendMode: isHovering ? 'difference' : 'normal',
                willChange: 'width, height, transform',
              }}
            />
          </div>

          <div
            ref={dotRef}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '5px',
              height: '5px',
              background: '#E31C1C',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 9999,
              transform: 'translate(-50%, -50%)',
              willChange: 'transform',
            }}
          />
        </>
      )}
    </>
  );
}
