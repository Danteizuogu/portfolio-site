import { Box, Heading, Text, Flex, VStack, HStack } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <Box 
      minH="100vh" 
      w="100vw"
      display="flex" 
      flexDirection="column"
      position="relative"
      overflow="hidden"
      margin="0"
      padding="0"
    >
      {/* Gradient Background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="linear(to-br, brand.light, brand.white)"
        opacity="0.7"
        _before={{
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'radial-gradient(circle at 20% 20%, brand.medium 0%, transparent 50%)',
          opacity: '0.1',
        }}
        _after={{
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'radial-gradient(circle at 80% 80%, brand.dark 0%, transparent 50%)',
          opacity: '0.1',
        }}
      />

      {/* Navbar */}
      <Box position="relative" zIndex="1">
        <Navbar />
      </Box>

      {/* Content */}
      <Box 
        flex="1"
        display="flex" 
        alignItems="center"
        position="relative"
        zIndex="1"
      >
        <VStack 
          spacing={8} 
          align="start" 
          w="100%" 
          px={8}
        >
          <Heading 
            fontSize="6xl" 
            fontWeight="bold"
            fontFamily="heading"
          >
            Building Digital <Box as="span" color="brand.medium">Experiences</Box>
          </Heading>
          
          <Text fontSize="xl" maxW="600px" lineHeight="1.6">
            Full-stack developer crafting elegant solutions to complex problems.
            Specializing in modern web technologies and user-centric design.
          </Text>

          <HStack spacing={4} pt={4}>
            <Box 
              p={4} 
              border="2px" 
              borderColor="brand.medium" 
              borderRadius="md"
              _hover={{ bg: 'brand.light' }}
              transition="all 0.2s"
            >
              <Text>View Projects</Text>
            </Box>
            <Box 
              p={4} 
              border="2px" 
              borderColor="brand.dark" 
              borderRadius="md"
              _hover={{ bg: 'brand.light' }}
              transition="all 0.2s"
            >
              <Text>Contact Me</Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}

export default Home 