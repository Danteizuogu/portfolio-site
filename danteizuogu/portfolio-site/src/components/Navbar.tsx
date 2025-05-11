import { Box, Flex, Link, Spacer } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box 
      as="nav" 
      bg="brand.white" 
      px={8} 
      py={4} 
      borderBottom="1px" 
      borderColor="brand.light"
    >
      <Flex align="center">
        <Link 
          as={RouterLink} 
          to="/" 
          fontSize="xl" 
          fontWeight="bold" 
          color="brand.dark"
          _hover={{ color: 'brand.medium' }}
        >
          Your Name
        </Link>
        <Spacer />
        <Flex gap={8}>
          <Link 
            as={RouterLink} 
            to="/portfolio" 
            color="brand.dark"
            _hover={{ color: 'brand.medium' }}
          >
            Portfolio
          </Link>
          <Link 
            as={RouterLink} 
            to="/contact" 
            color="brand.dark"
            _hover={{ color: 'brand.medium' }}
          >
            Contact
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar 