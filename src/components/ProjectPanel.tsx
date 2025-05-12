import { Box, Text, VStack, Link } from '@chakra-ui/react'

interface ProjectPanelProps {
  imageUrl: string
  projectName: string
  releaseDate: string
  projectLink?: string  // URL to live project
  githubLink?: string   // URL to GitHub repository
}

const ProjectPanel = ({ 
  imageUrl, 
  projectName, 
  releaseDate,
  projectLink,
  githubLink 
}: ProjectPanelProps) => {
  return (
    <Box
      position="relative"
      width="100%"
      height="300px"
      overflow="hidden"
      borderRadius="md"
      cursor="pointer"
      transition="all 0.3s ease"
    >
      {/* Project Image */}
      <Box
        as="img"
        src={imageUrl}
        alt={projectName}
        width="100%"
        height="100%"
        objectFit="cover"
      />
      
      {/* Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="brand.dark"
        opacity="0"
        transition="opacity 0.3s ease"
        _hover={{
          opacity: 0.9
        }}
      >
        {/* Content */}
        <VStack
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
          textAlign="center"
          spacing={2}
        >
          <Text fontSize="2xl" fontWeight="bold">
            {projectName}
          </Text>
          <Text fontSize="md">
            Released: {releaseDate}
          </Text>
          {/* Links */}
          <VStack spacing={2} mt={4}>
            {projectLink && (
              <Link 
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                color="white"
                _hover={{ color: 'brand.medium' }}
              >
                View Live
              </Link>
            )}
            {githubLink && (
              <Link 
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                color="white"
                _hover={{ color: 'brand.medium' }}
              >
                View Code
              </Link>
            )}
          </VStack>
        </VStack>
      </Box>
    </Box>
  )
}

export default ProjectPanel 