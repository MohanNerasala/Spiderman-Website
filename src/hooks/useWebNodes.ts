import { useRef } from 'react';

export interface WebNode {
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

// Global shared state for nodes
const globalNodes: WebNode[] = [];

export const useWebNodes = () => {
  const nodesRef = useRef(globalNodes);

  const addForceToNearestNodes = (x: number, y: number, force: number) => {
    nodesRef.current.forEach(node => {
      const dx = x - node.x;
      const dy = y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        // Push outward from (x, y)
        const f = (150 - dist) / 150;
        node.vx -= dx * f * force;
        node.vy -= dy * f * force;
      }
    });
  };

  const attractNodesToPoint = (x: number, y: number, radius: number, strength: number) => {
    nodesRef.current.forEach(node => {
      const dx = x - node.x;
      const dy = y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        // Attract toward (x, y)
        const f = (radius - dist) / radius;
        node.vx += dx * f * strength;
        node.vy += dy * f * strength;
      }
    });
  };

  return {
    nodes: nodesRef.current,
    addForceToNearestNodes,
    attractNodesToPoint
  };
};
