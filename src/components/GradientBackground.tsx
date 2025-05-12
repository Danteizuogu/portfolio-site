import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useEffect, useState } from 'react'

const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 100%, 50%)`
}

const moveGradient = keyframes`
  0% { transform: translate(0%, 0%) rotate(0deg); }
  25% { transform: translate(10%, 10%) rotate(90deg); }
  50% { transform: translate(0%, 20%) rotate(180deg); }
  75% { transform: translate(-10%, 10%) rotate(270deg); }
  100% { transform: translate(0%, 0%) rotate(360deg); }
`

const GradientBackground = () => {
  const [colors, setColors] = useState({
    color1: generateRandomColor(),
    color2: generateRandomColor(),
    color3: generateRandomColor(),
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setColors({
        color1: generateRandomColor(),
        color2: generateRandomColor(),
        color3: generateRandomColor(),
      })
    }, 5000) // Change colors every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="1"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-50%"
        left="-50%"
        right="-50%"
        bottom="-50%"
        background={`radial-gradient(circle at center, ${colors.color1} 0%, transparent 50%),
                    radial-gradient(circle at 30% 70%, ${colors.color2} 0%, transparent 50%),
                    radial-gradient(circle at 70% 30%, ${colors.color3} 0%, transparent 50%)`}
        animation={`${moveGradient} 20s infinite linear`}
        opacity="0.8"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        background="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(100px)"
      />
    </Box>
  )
}

export default GradientBackground 