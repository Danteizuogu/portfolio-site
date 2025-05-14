import { Box, Flex, Link, Spacer } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box 
      as="nav" 
      bg="transparent" 
      px={8} 
      py={4}
    >
      <Flex align="center">
        <Link 
          as={RouterLink} 
          to="/" 
          fontSize="xl" 
          fontWeight="bold" 
          color="brand.text"
          _hover={{ color: 'brand.accent' }}
          transition="color 0.2s"
        >
          Dante Izuogu<Box as="span" color="rgba(57, 255, 20, 1)">.</Box>
        </Link>
        <Spacer />
        <Flex gap={8}>
          <Link 
            as={RouterLink} 
            to="/portfolio" 
            color="brand.text"
            textDecoration="none"
            borderBottom="2px solid transparent"
            _hover={{ 
              color: 'brand.accent',
              borderBottom: '2px solid',
              borderColor: 'brand.accent'
            }}
          >
            Portfolio
          </Link>
          <Link 
            as={RouterLink} 
            to="/contact" 
            color="brand.text"
            textDecoration="none"
            borderBottom="2px solid transparent"
            _hover={{ 
              color: 'brand.accent',
              borderBottom: '2px solid',
              borderColor: 'brand.accent'
            }}
          >
            Contact
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar 