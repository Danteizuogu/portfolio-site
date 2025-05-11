import { Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

function App() {
  return (
    <Box minH="100vh" w="100vw" bg="brand.white">
      <Navbar />
      <Box px={8} py={8} w="100%">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
