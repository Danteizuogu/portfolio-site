import { Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

function App() {
  return (
    <Box minH="100vh" w="100vw" bg="brand.white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={
          <>
            <Navbar />
            <Box px={8} py={8} w="100%">
              <Portfolio />
            </Box>
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <Box px={8} py={8} w="100%">
              <Contact />
            </Box>
            <Footer />
          </>
        } />
      </Routes>
    </Box>
  )
}

export default App
