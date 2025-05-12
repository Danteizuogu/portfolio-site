import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react'
import { FaXTwitter, FaLinkedin, FaReddit, FaGithub, FaQuora, FaFacebook } from 'react-icons/fa6'

const Footer = () => {
  const socialLinks = [
    { icon: FaXTwitter, url: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: FaReddit, url: 'https://reddit.com/user/yourusername', label: 'Reddit' },
    { icon: FaGithub, url: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: FaQuora, url: 'https://quora.com/profile/yourusername', label: 'Quora' },
    { icon: FaFacebook, url: 'https://facebook.com/yourusername', label: 'Facebook' }
  ]

  return (
    <Box 
      as="footer" 
      bg="brand.white" 
      px={8} 
      py={4} 
      borderTop="1px" 
      borderColor="brand.light"
    >
      <Flex align="center" justify="space-between">
        <Text color="brand.dark">
          dante.izuogu@proton.me
        </Text>
        <HStack spacing={4}>
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              color="brand.dark"
              _hover={{ color: 'brand.medium' }}
            >
              <social.icon size={20} />
            </Link>
          ))}
        </HStack>
      </Flex>
    </Box>
  )
}

export default Footer 