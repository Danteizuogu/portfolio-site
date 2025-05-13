import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ x: number; y: number; opacity: number }[]>([]);
  const activeNodesRef = useRef<Set<number>>(new Set());

  const totalNodes = 100;
  const nodeColor = 'rgba(128, 128, 128, 0.3)';
  const highlightColor = 'rgba(57, 255, 20, 1)';

  const initPoints = () => {
    pointsRef.current = Array.from({ length: totalNodes }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: Math.random() * 0.7 + 0.3,
    }));



  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pointsRef.current.forEach((point, index) => {
      ctx.beginPath();
      ctx.fillStyle = activeNodesRef.current.has(index)
        ? highlightColor
        : nodeColor;
      ctx.globalAlpha = point.opacity;
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    activeNodesRef.current.forEach((index) => {
      pointsRef.current[index].opacity -= 0.01;
      if (pointsRef.current[index].opacity <= 0.3) {
        pointsRef.current[index].opacity = 0.3;
        activeNodesRef.current.delete(index);
      }
    });

    requestAnimationFrame(draw);
  };

  const activateRandomNodes = () => {
    const randomIndices = Array.from({ length: 5 }, () => Math.floor(Math.random() * pointsRef.current.length));
    randomIndices.forEach(index => {
      if (pointsRef.current[index]) {
        activeNodesRef.current.add(index);
        pointsRef.current[index].opacity = 1;
      }
    });
    const randomIndex = Math.floor(Math.random() * pointsRef.current.length);
    if (pointsRef.current[randomIndex]) {
      activeNodesRef.current.add(randomIndex);
      pointsRef.current[randomIndex].opacity = 1;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    initPoints();
    draw();

    const intervalId = setInterval(activateRandomNodes, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      as="canvas"
      ref={canvasRef}
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      zIndex={0}
    />
  );
};

export default AnimatedBackground;
