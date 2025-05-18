import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Grid,
  GridItem,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
  useToast,
  Text,
  Divider,
  HStack,
  Link,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaXTwitter, FaLinkedin, FaGithub } from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key from environment variables
emailjs.init({
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
});

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cooldownActive, setCooldownActive] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<number>(0);
  const toast = useToast();

  // Check if cooldown is active on component mount
  useEffect(() => {
    const lastSubmissionTime = localStorage.getItem('lastFormSubmission');
    if (lastSubmissionTime) {
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - parseInt(lastSubmissionTime);
      const tenMinutesInMs = 10 * 60 * 1000;
      
      if (timeDiff < tenMinutesInMs) {
        setCooldownActive(true);
        const remainingTime = Math.ceil((tenMinutesInMs - timeDiff) / 1000 / 60);
        setCooldownTime(remainingTime);
        
        // Set a timeout to clear the cooldown
        const timeoutId = setTimeout(() => {
          setCooldownActive(false);
          setCooldownTime(0);
        }, tenMinutesInMs - timeDiff);
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, []);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formValues.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formValues.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formValues.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cooldownActive) {
      toast({
        title: 'Please wait',
        description: `You can submit another message in ${cooldownTime} minutes.`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Send email using EmailJS with environment variables
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formValues.name,
          from_email: formValues.email,
          subject: formValues.subject,
          message: formValues.message,
          to_email: 'dante.izuogu@proton.me',
        }
      );
      
      // Set cooldown
      localStorage.setItem('lastFormSubmission', new Date().getTime().toString());
      setCooldownActive(true);
      setCooldownTime(10);
      
      // Reset form
      setFormValues({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      toast({
        title: 'Message sent!',
        description: 'Your message has been sent successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Set a timeout to clear the cooldown after 10 minutes
      setTimeout(() => {
        setCooldownActive(false);
        setCooldownTime(0);
      }, 10 * 60 * 1000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Error',
        description: 'There was an error sending your message. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'dante.izuogu@proton.me',
      link: 'mailto:dante.izuogu@proton.me'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+44 123 456 7890',
      link: 'tel:+441234567890'
    },
    {
      icon: FaLocationDot,
      label: 'Location',
      value: 'London, United Kingdom',
      link: null
    }
  ];

  const socialLinks = [
    { icon: FaXTwitter, url: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: FaGithub, url: 'https://github.com/yourusername', label: 'GitHub' },
  ];

  return (
    <Box py={8} pt="75px">
      <Heading color="brand.text" mb={8}>Contact Me</Heading>
      
      <Grid templateColumns={{ base: '1fr', md: '1fr 1px 1fr' }} gap={12}>
        {/* Contact Form */}
        <GridItem>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  borderColor="brand.light"
                  _hover={{ borderColor: 'brand.accent' }}
                  _focus={{ borderColor: 'brand.accent', boxShadow: 'none' }}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  borderColor="brand.light"
                  _hover={{ borderColor: 'brand.accent' }}
                  _focus={{ borderColor: 'brand.accent', boxShadow: 'none' }}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.subject}>
                <FormLabel>Subject</FormLabel>
                <Input
                  type="text"
                  name="subject"
                  value={formValues.subject}
                  onChange={handleChange}
                  borderColor="brand.light"
                  _hover={{ borderColor: 'brand.accent' }}
                  _focus={{ borderColor: 'brand.accent', boxShadow: 'none' }}
                />
                <FormErrorMessage>{errors.subject}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.message}>
                <FormLabel>Message</FormLabel>
                <Textarea
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  rows={6}
                  borderColor="brand.light"
                  _hover={{ borderColor: 'brand.accent' }}
                  _focus={{ borderColor: 'brand.accent', boxShadow: 'none' }}
                />
                <FormErrorMessage>{errors.message}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                isLoading={isLoading}
                p={4}
                border="2px"
                bg="none"
                textColor="brand.text"
                borderColor="brand.text"
                borderRadius="md"
                _hover={{ borderColor: 'brand.accent', color: 'brand.accent' }}
                transition="all 0.2s"
                w="full"
                isDisabled={cooldownActive}
              >
                {cooldownActive ? `Wait ${cooldownTime} minutes` : 'Send Message'}
              </Button>
              
              {cooldownActive && (
                <Text fontSize="sm" color="brand.accent">
                  You can submit another message in {cooldownTime} minutes.
                </Text>
              )}
            </VStack>
          </form>
        </GridItem>

        {/* Divider */}
        <GridItem>
          <Divider orientation="vertical" borderColor="brand.light" />
        </GridItem>

        {/* Contact Information */}
        <GridItem>
          <VStack spacing={8} align="start">
            <Box>
              <Heading size="md" mb={4} color="brand.text">Contact Information</Heading>
              <VStack spacing={4} align="start">
                {contactInfo.map((item, index) => (
                  <HStack key={index} spacing={4}>
                    <Icon as={item.icon} boxSize={5} color="brand.accent" />
                    <Box>
                      <Text fontWeight="bold" color="brand.text">{item.label}</Text>
                      {item.link ? (
                        <Link href={item.link} color="brand.text" _hover={{ color: 'brand.accent' }}>
                          {item.value}
                        </Link>
                      ) : (
                        <Text color="brand.text">{item.value}</Text>
                      )}
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Box>
              <Heading size="md" mb={4} color="brand.text">Follow Me</Heading>
              <Flex gap={4}>
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon 
                      as={social.icon} 
                      boxSize={6} 
                      color="brand.text"
                      _hover={{ color: 'brand.accent' }}
                      transition="color 0.2s"
                    />
                  </Link>
                ))}
              </Flex>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Contact;