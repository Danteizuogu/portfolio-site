import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ x: number; y: number; opacity: number }[]>([]);
  const activeNodeRef = useRef<number | null>(null);

  const gridSize = 35;
  const nodeColor = 'rgba(128, 128, 128, 0.3)'; // Grey
  const highlightColor = 'rgba(57, 255, 20, 1)'; // Neon green

  const initPoints = (width: number, height: number) => {
    const cols = Math.floor(width / gridSize);
    const rows = Math.floor(height / gridSize);
    pointsRef.current = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        pointsRef.current.push({
          x: j * gridSize,
          y: i * gridSize,
          opacity: 0.3,
        });
      }
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pointsRef.current.forEach((point, index) => {
      ctx.beginPath();
      ctx.fillStyle =
        index === activeNodeRef.current ? highlightColor : nodeColor;
      ctx.globalAlpha = point.opacity;
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    if (activeNodeRef.current !== null) {
      pointsRef.current[activeNodeRef.current].opacity -= 0.01;
      if (pointsRef.current[activeNodeRef.current].opacity <= 0.3) {
        pointsRef.current[activeNodeRef.current].opacity = 0.3;
        activeNodeRef.current = null;
      }
    }

    requestAnimationFrame(draw);
  };

  const activateRandomNode = () => {
    const randomIndex = Math.floor(Math.random() * pointsRef.current.length);
    activeNodeRef.current = randomIndex;
    pointsRef.current[randomIndex].opacity = 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    initPoints(width, height);
    draw();

    const intervalId = setInterval(activateRandomNode, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return <Box as="canvas" ref={canvasRef} position="fixed" top={0} left={0} width="100%" height="100%" zIndex={0} />;
};

export default AnimatedBackground;
