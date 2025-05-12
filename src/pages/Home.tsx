import { Box, Heading, Text, Flex, VStack, HStack } from '@chakra-ui/react'

const Home = () => {
  return (
    <Box 
      minH="calc(100vh - 80px)" 
      display="flex" 
      alignItems="center"
    >
      <VStack 
        spacing={8} 
        align="start" 
        w="100%" 
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
  )
}

export default Home 