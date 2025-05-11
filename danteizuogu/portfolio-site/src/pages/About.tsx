import { Box, Heading, Text, SimpleGrid, VStack, Icon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa'
import { SiTypescript, SiJavascript } from 'react-icons/si'

const MotionBox = motion(Box)

const skills = [
  { icon: FaReact, name: 'React', description: 'Building modern user interfaces' },
  { icon: SiTypescript, name: 'TypeScript', description: 'Type-safe JavaScript development' },
  { icon: SiJavascript, name: 'JavaScript', description: 'Core web development' },
  { icon: FaNodeJs, name: 'Node.js', description: 'Backend development' },
  { icon: FaPython, name: 'Python', description: 'Scripting and automation' },
  { icon: FaDatabase, name: 'Databases', description: 'SQL and NoSQL solutions' },
]

const About = () => {
  return (
    <VStack spacing={12} align="stretch">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size="2xl" mb={6}>
          About Me
        </Heading>
        <Text fontSize="lg" color="gray.300">
          I'm a passionate software developer with a strong foundation in web development
          and a keen eye for creating intuitive user experiences. My journey in tech
          has equipped me with a diverse set of skills and a problem-solving mindset.
        </Text>
      </MotionBox>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Heading as="h2" size="xl" mb={6}>
          Skills
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {skills.map((skill, index) => (
            <MotionBox
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              p={6}
              bg="gray.800"
              borderRadius="lg"
              _hover={{ transform: 'translateY(-5px)', transition: 'all 0.2s' }}
            >
              <VStack spacing={3}>
                <Icon as={skill.icon} w={10} h={10} color="brand.400" />
                <Heading as="h3" size="md">
                  {skill.name}
                </Heading>
                <Text color="gray.400" textAlign="center">
                  {skill.description}
                </Text>
              </VStack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </MotionBox>
    </VStack>
  )
}

export default About 