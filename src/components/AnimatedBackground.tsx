import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridSpacing = 30; // Spacing between nodes
  const nodeRadius = 3; // Radius of each node
  const nodeColor = 'rgba(128, 128, 128, 0.5)';
  const highlightColor = 'rgba(57, 255, 20,'; // Base highlight color
  const highlightRadius = 100; // Radius around cursor to highlight nodes

  let mouseX = 0;
  let mouseY = 0;

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    for (let x = 0; x < width; x += gridSpacing) {
      for (let y = 0; y < height; y += gridSpacing) {
        const distance = Math.hypot(x - mouseX, y - mouseY);
        const opacity = Math.max(0, 1 - distance / highlightRadius);
        ctx.beginPath();
        ctx.fillStyle = distance < highlightRadius ? `${highlightColor} ${opacity})` : nodeColor;
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(drawGrid);
  };

  const handleMouseMove = (event: MouseEvent) => {
    mouseX = event.clientX;
    mouseY = event.clientY + window.scrollY;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('mousemove', handleMouseMove);
    drawGrid();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <Box as="canvas" ref={canvasRef} position="fixed" top={0} left={0} zIndex={1} />;
};

export default AnimatedBackground;
