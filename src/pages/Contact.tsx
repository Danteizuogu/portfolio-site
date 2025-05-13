import { useState } from 'react'
import { Box, Heading, VStack, Input, Textarea, Button, useToast, FormControl, FormLabel, FormErrorMessage, Grid, GridItem, Text, Divider, HStack, Link } from '@chakra-ui/react'
import { FaXTwitter, FaLinkedin, FaReddit, FaGithub, FaQuora, FaFacebook } from 'react-icons/fa6'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: '',
      email: '',
      message: ''
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name'
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email'
      isValid = false
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message'
      isValid = false
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: 'dante.izuogu@proton.me',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY'
      )

      toast({
        title: 'Message sent successfully!',
        description: "I'll get back to you as soon as possible.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      setFormData({ name: '', email: '', message: '' })
      setErrors({ name: '', email: '', message: '' })
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again."
      
      if (error instanceof Error) {
        if (error.message.includes('network')) {
          errorMessage = "Network error. Please check your internet connection."
        } else if (error.message.includes('service')) {
          errorMessage = "Email service error. Please try again later."
        }
      }

      toast({
        title: 'Failed to send message',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const socialLinks = [
    { icon: FaXTwitter, url: 'https://twitter.com/yourusername', label: 'Twitter', username: '@yourusername' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn', username: 'yourusername' },
    { icon: FaReddit, url: 'https://reddit.com/user/yourusername', label: 'Reddit', username: 'u/yourusername' },
    { icon: FaGithub, url: 'https://github.com/yourusername', label: 'GitHub', username: '@yourusername' },
    { icon: FaQuora, url: 'https://quora.com/profile/yourusername', label: 'Quora', username: 'yourusername' },
    { icon: FaFacebook, url: 'https://facebook.com/yourusername', label: 'Facebook', username: 'yourusername' }
  ]

  return (
    <Box py={8}>
      <Heading color="brand.dark" mb={8}>Contact Me</Heading>
      
      <Grid templateColumns={{ base: '1fr', md: '1fr 1px 1fr' }} gap={12}>
        {/* Contact Form */}
        <GridItem>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    setErrors({ ...errors, name: '' })
                  }}
                  borderColor="brand.medium"
                  _hover={{ borderColor: 'brand.dark' }}
                  _focus={{ borderColor: 'brand.accent', boxShadow: '0 0 0 1px var(--chakra-colors-brand-accent)' }}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    setErrors({ ...errors, email: '' })
                  }}
                  borderColor="brand.medium"
                  _hover={{ borderColor: 'brand.dark' }}
                  _focus={{ borderColor: 'brand.accent', boxShadow: '0 0 0 1px var(--chakra-colors-brand-accent)' }}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.message}>
                <FormLabel>Message</FormLabel>
                <Textarea
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value })
                    setErrors({ ...errors, message: '' })
                  }}
                  rows={6}
                  borderColor="brand.medium"
                  _hover={{ borderColor: 'brand.dark' }}
                  _focus={{ borderColor: 'brand.accent', boxShadow: '0 0 0 1px var(--chakra-colors-brand-accent)' }}
                />
                <FormErrorMessage>{errors.message}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                isLoading={isLoading}
                p={4}
                border="2px"
                borderColor="brand.dark"
                borderRadius="md"
                _hover={{ bg: 'brand.light', borderColor: 'brand.accent', color: 'brand.accent' }}
                transition="all 0.2s"
                w="full"
              >
                Send Message
              </Button>
            </VStack>
          </form>
        </GridItem>

        {/* Divider */}
        <GridItem>
          <Divider orientation="vertical" borderColor="brand.light" />
        </GridItem>

        {/* Social Links */}
        <GridItem>
          <VStack spacing={24} align="start">
            <Box>
              <Text fontSize="lg" fontWeight="medium" mb={2}>Connect with me</Text>
              <Text color="brand.dark" fontSize="md">
                dante.izuogu@proton.me
              </Text>
            </Box>
            
            <VStack spacing={6} align="start" w="100%">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="brand.dark"
                  _hover={{ color: 'brand.medium' }}
                  display="flex"
                  alignItems="center"
                  gap={3}
                  className="social-link"
                >
                  <social.icon size={24} />
                  <Box>
                    <Text fontSize="sm" color="brand.dark" fontWeight="medium">
                      {social.username}
                    </Text>
                  </Box>
                </Link>
              ))}
            </VStack>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Contact 