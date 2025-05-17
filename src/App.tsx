import { Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import AnimatedBackground from './components/AnimatedBackground'

function App() {
  return (
    <Box 
      minH="100vh" 
      w="100vw" 
      position="relative"
      overflowX="hidden"
      bg="black"
    >
      {/* Background - fixed and interactive */}
      <AnimatedBackground />
      
      {/* Content */}
      <Box 
        position="relative" 
        zIndex={1} 
        bg="transparent"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Navbar />
        <Box 
          as="main"
          flex={1}
          px={8} 
          py={8} 
          w="100%" 
          position="relative"
          zIndex={1}
          bg="transparent"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Box>
  )
}

export default App
