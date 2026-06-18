import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVy: number;
  size: number;
  opacity: number;
  life: number;
  pulseSpeed: number;
}

const NODE_COUNT = 35; // Reduced from 45 for better 60fps performance
const MAX_DISTANCE = 180;
const MOUSE_RADIUS = 200;
const GRAVITY = 0.015;
const FRICTION = 0.992;

export default function WebCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef({ currentY: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const createNodes = () => {
      const newNodes: Node[] = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        newNodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -(Math.random() * 0.5 + 0.1),
          baseVy: -(Math.random() * 0.3 + 0.2),
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.4,
          life: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
      nodesRef.current = newNodes;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleScroll = () => {
      scrollRef.current.lastY = scrollRef.current.currentY;
      scrollRef.current.currentY = window.scrollY;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    createNodes();
    let time = 0;

    const render = () => {
      if (!ctx) return;
      
      // Clear main canvas directly
      ctx.clearRect(0, 0, width, height);
      
      const nodes = nodesRef.current;
      const { x: mouseX, y: mouseY } = mouseRef.current;
      
      const scrollVelocity = scrollRef.current.currentY - scrollRef.current.lastY;
      scrollRef.current.lastY += (scrollRef.current.currentY - scrollRef.current.lastY) * 0.1;

      time++;

      if (!prefersReducedMotion) {
        nodes.forEach((node, index) => {
          node.vy -= scrollVelocity * 0.09;
          node.vy += GRAVITY;
          node.vy += (node.baseVy - node.vy) * 0.02;
          node.vx += Math.sin(time * 0.001 + index * 0.5) * 0.03;
          
          node.x += node.vx;
          node.y += node.vy;
          
          node.vx *= FRICTION;
          node.vy *= FRICTION;
          
          node.life += node.pulseSpeed;

          if (node.x < 0 || node.x > width) node.vx *= -0.8;
          if (node.y < 0) {
            node.vy *= -0.5;
            node.y = 0;
          }
          if (node.y > height) {
            node.y = height;
            node.vy = node.baseVy;
          }

          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            node.vx += dx * force * 0.003;
            node.vy += dy * force * 0.003;
          }
        });
      }

      ctx.lineWidth = 1.2;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DISTANCE) {
            const alpha = (1 - dist / MAX_DISTANCE) * 0.55;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(227, 28, 28, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      ctx.lineWidth = 0.4;
      for (let i = 0; i < nodes.length; i++) {
        const dx = mouseX - nodes[i].x;
        const dy = mouseY - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          const alpha = (1 - dist / 220) * 0.35;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.stroke();
        }
      }

      nodes.forEach((node) => {
        const pulsedOpacity = prefersReducedMotion 
          ? node.opacity 
          : node.opacity * (0.7 + Math.sin(node.life) * 0.3);

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(227, 28, 28, ${pulsedOpacity * 0.2})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(227, 28, 28, ${pulsedOpacity})`;
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render();
    } else {
      animationRef.current = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.45,
        willChange: 'transform' // Performance opt
      }}
    />
  );
}
