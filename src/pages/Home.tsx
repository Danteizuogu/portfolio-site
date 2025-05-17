import { Box, Heading, Text, Flex, VStack, HStack, Link } from '@chakra-ui/react'

const Home = () => {
  return (
    <Box 
      h="100vh" 
      display="flex" 
      alignItems="flex-start"
      pt="125px" // Remove padding to position content at the top
      overflow="hidden"
      style={{
        overflowY: 'hidden',
        overscrollBehavior: 'none'
      }}
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
          Building Digital Tools.
        </Heading>
        
        <Text fontSize="xl" maxW="600px" lineHeight="1.6">
          Full-stack developer crafting elegant solutions to complex problems.
          Specializing in modern web technologies and user-centric design.
        </Text>

        <HStack spacing={4} pt={4}>
          <Link href="/portfolio" className="no-underline" style={{ textDecoration: 'none' }}>
            <Box 
              p={4} 
              border="2px" 
              className="no-underline"
              borderColor="brand.text" 
              borderRadius="md"
              _hover={{ bg: 'brand.light', borderColor: 'brand.accent', color: 'brand.accent' }}
              transition="all 0.2s"
            >
              <Text>View Projects</Text>
            </Box>
          </Link>
          <Link href="/contact" className="no-underline" style={{ textDecoration: 'none' }}>
            <Box 
              p={4} 
              border="2px" 
              borderColor="brand.dark" 
              className="no-underline"
              borderRadius="md"
              _hover={{borderColor: 'brand.accent', color: 'brand.accent' }}
              transition="all 0.2s"
            >
              <Text>Contact Me</Text>
            </Box>
          </Link>
        </HStack>
      </VStack>
    </Box>
  )
}

export default Home 