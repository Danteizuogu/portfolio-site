import { Box } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

interface Point {
  x: number
  y: number
  size: number
  opacity: number
}

// Debug logging
console.log('GradientBackground component loaded')

const GradientBackground = () => {

  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const points = useRef<Point[]>([])
  const mousePos = useRef<{ x: number; y: number } | null>(null)
  
  // Grid configuration - adjusted for better visibility
  const gridSize = 35
  const maxDistance = gridSize * 1.5
  const baseSize = 2
  const maxSize = 8
  const baseOpacity = 0.5  // Increased for better visibility
  const maxOpacity = 1
  
  // Colors - using solid colors for now
  const dotColor = '#FFFFFF'  // Solid white
  const highlightColor = 'rgba(57, 255, 20, 1)' // Neon green
  
  // Initialize points
  const initPoints = (width: number, height: number) => {

    
    const cols = Math.ceil(width / gridSize) + 1
    const rows = Math.ceil(height / gridSize) + 1
    
    points.current = []
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        points.current.push({
          x: j * gridSize,
          y: i * gridSize,
          size: baseSize,
          opacity: baseOpacity
        })
      }
    }
    

  }
  
  // Randomly activate a node and its neighbors
  const activateRandomNode = () => {
    if (points.current.length === 0) return
    const randomIndex = Math.floor(Math.random() * points.current.length)
    setActiveNode(randomIndex)
    
    setTimeout(() => {
      setActiveNode(null)
    }, 1000) // Pulse duration
  }
  
  // Update points for pulsing effect
  const updatePoints = () => {
    points.current.forEach((point, index) => {
      if (index === activeNode) {
        point.size = maxSize
        point.opacity = maxOpacity
      } else if (
        activeNode !== null &&
        (index === activeNode - 1 || index === activeNode + 1 || // Horizontal neighbors
         index === activeNode - Math.ceil(window.innerWidth / gridSize) || // Vertical neighbors
         index === activeNode + Math.ceil(window.innerWidth / gridSize))
      ) {
        point.size = (baseSize + maxSize) / 2
        point.opacity = (baseOpacity + maxOpacity) / 2
      } else {
        point.size = baseSize
        point.opacity = baseOpacity
      }
    })
  }
  
  // Draw function - simplified
  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.log('Canvas not available')
      return
    }
    
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.log('Could not get 2D context')
      return
    }
    
    // Clear canvas with a semi-transparent black
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Update points based on mouse position
    updatePoints()
    
    // Draw all points
    points.current.forEach(point => {
      ctx.beginPath()
      
      // Simple solid color for now
      if (mousePos.current) {
        const dx = point.x - mousePos.current.x
        const dy = point.y - mousePos.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < maxDistance) {
          const ratio = 1 - (distance / maxDistance)
          ctx.fillStyle = highlightColor
          ctx.globalAlpha = baseOpacity + (maxOpacity - baseOpacity) * ratio
          ctx.arc(point.x, point.y, baseSize + (maxSize - baseSize) * ratio, 0, Math.PI * 2)
        } else {
          ctx.fillStyle = dotColor
          ctx.globalAlpha = baseOpacity
          ctx.arc(point.x, point.y, baseSize, 0, Math.PI * 2)
        }
      } else {
        ctx.fillStyle = dotColor
        ctx.globalAlpha = baseOpacity
        ctx.arc(point.x, point.y, baseSize, 0, Math.PI * 2)
      }
      
      ctx.fill()
    })
    
    // Continue animation
    animationFrameId.current = requestAnimationFrame(draw)
  }
  
  // Initialize and handle resize
  useEffect(() => {

    
    const canvas = canvasRef.current
    if (!canvas) {
      console.log('Canvas ref is null')
      return
    }
    
    // Set initial canvas size
    const updateCanvasSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      
      // Set display size (CSS)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      
      // Set actual size in memory (scaled to account for extra pixel density)
      const scale = window.devicePixelRatio || 1
      canvas.width = width * scale
      canvas.height = height * scale
      
      // Scale the context to ensure correct drawing operations
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(scale, scale)
      }
      
      initPoints(width, height)
    }
    
    // Set initial size
    updateCanvasSize()
    
    // Update mouse position
  const handleMouseMove = (event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      mousePos.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    }
  }

  canvasRef.current?.addEventListener('mousemove', handleMouseMove)

  // Start animation

    const animationId = requestAnimationFrame(draw)
    
    // Randomly activate nodes
    const pulseInterval = setInterval(activateRandomNode, 2000) // Pulse every 2 seconds
    
    // Handle window resize
    const handleResize = () => {

      updateCanvasSize()
    }
    
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    canvasRef.current?.removeEventListener('mousemove', handleMouseMove)
    return () => {

      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      clearInterval(pulseInterval)
    }
  }, [])
  


  console.log('Rendering canvas')
  
  return (
    <Box
      as="canvas"
      ref={canvasRef}
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={0}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  )
}

export default GradientBackground