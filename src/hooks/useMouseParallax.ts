import { useState, useEffect } from 'react';

export function useMouseParallax() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    angle: 0
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;
      const angle = (Math.atan2(normY, normX) * 180) / Math.PI + 180;

      setMousePosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: normX,
        normalizedY: normY,
        angle
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
}
