import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridSpacing = 20; // Spacing between nodes
  const nodeRadius = 1.5; // Radius of each node
  const nodeColor = 'rgba(128, 128, 128, 0.4)';
  const highlightColor = 'rgba(57, 255, 20,'; // Base highlight color
  const highlightRadius = 95; // Radius around cursor to highlight nodes
  const minOpacity = 0.3; // Minimum opacity for highlighted nodes

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
        let opacity = Math.max(minOpacity, 1 - distance / highlightRadius);
        if (distance < highlightRadius) {
          opacity = Math.min(1, opacity + 0.05); // Increase opacity when close to mouse
          ctx.fillStyle = `${highlightColor} ${opacity})`;
        } else {
          opacity = Math.max(minOpacity, opacity - 0.000001); // Decrease opacity slowly for memory effect
          ctx.fillStyle = `${nodeColor}`;
        }
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(drawGrid);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
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
