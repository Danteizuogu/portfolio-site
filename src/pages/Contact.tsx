import { useState } from 'react'
import { Box, Heading, Text, VStack, Input, Textarea, Button, useToast, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
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

  return (
    <Box maxW="600px" mx="auto" py={8}>
      <Heading color="brand.dark" mb={8}>Contact Me</Heading>
      
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
              _focus={{ borderColor: 'brand.dark', boxShadow: '0 0 0 1px var(--chakra-colors-brand-dark)' }}
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
              _focus={{ borderColor: 'brand.dark', boxShadow: '0 0 0 1px var(--chakra-colors-brand-dark)' }}
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
              _focus={{ borderColor: 'brand.dark', boxShadow: '0 0 0 1px var(--chakra-colors-brand-dark)' }}
            />
            <FormErrorMessage>{errors.message}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            isLoading={isLoading}
            bg="brand.medium"
            color="white"
            _hover={{ bg: 'brand.dark' }}
            w="full"
          >
            Send Message
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default Contact 