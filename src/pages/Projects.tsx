import { Box, Heading, Text, SimpleGrid, VStack, Button, Image, Badge, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const MotionBox = motion(Box)

const projects = [
  {
    title: 'Project One',
    description: 'A modern web application built with React and Node.js',
    image: 'https://via.placeholder.com/400x300',
    technologies: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/danteizuogu/project-one',
    live: 'https://project-one.com',
  },
  {
    title: 'Project Two',
    description: 'An e-commerce platform with real-time inventory management',
    image: 'https://via.placeholder.com/400x300',
    technologies: ['TypeScript', 'Express', 'PostgreSQL'],
    github: 'https://github.com/danteizuogu/project-two',
    live: 'https://project-two.com',
  },
  {
    title: 'Project Three',
    description: 'A social media dashboard with analytics',
    image: 'https://via.placeholder.com/400x300',
    technologies: ['React', 'Python', 'Django'],
    github: 'https://github.com/danteizuogu/project-three',
    live: 'https://project-three.com',
  },
]

const Projects = () => {
  return (
    <VStack spacing={12} align="stretch">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size="2xl" mb={6}>
          My Projects
        </Heading>
        <Text fontSize="lg" color="gray.300">
          Here are some of the projects I've worked on. Each one represents
          a unique challenge and learning experience.
        </Text>
      </MotionBox>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {projects.map((project, index) => (
          <MotionBox
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            bg="gray.800"
            borderRadius="lg"
            overflow="hidden"
            _hover={{ transform: 'translateY(-5px)', transition: 'all 0.2s' }}
          >
            <Image src={project.image} alt={project.title} w="100%" h="200px" objectFit="cover" />
            <VStack p={6} spacing={4} align="stretch">
              <Heading as="h3" size="md">
                {project.title}
              </Heading>
              <Text color="gray.400">{project.description}</Text>
              <HStack spacing={2} wrap="wrap">
                {project.technologies.map((tech) => (
                  <Badge key={tech} colorScheme="brand">
                    {tech}
                  </Badge>
                ))}
              </HStack>
              <HStack spacing={4}>
                <Button
                  as="a"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaGithub />}
                  size="sm"
                  variant="outline"
                >
                  Code
                </Button>
                <Button
                  as="a"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaExternalLinkAlt />}
                  size="sm"
                  variant="outline"
                >
                  Live Demo
                </Button>
              </HStack>
            </VStack>
          </MotionBox>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default Projects 