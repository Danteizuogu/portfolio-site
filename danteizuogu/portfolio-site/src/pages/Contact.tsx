import { Box, Heading, Text, VStack, FormControl, FormLabel, Input, Textarea, Button, HStack, Icon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'

const MotionBox = motion(Box)

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add form submission logic here
  }

  return (
    <Box>
      <Heading color="brand.dark" mb={6}>Contact</Heading>
      <Text color="brand.dark">
        Your contact information and form will go here.
      </Text>
    </Box>
  )
}

export default Contact 