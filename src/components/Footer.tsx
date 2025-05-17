import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { FaXTwitter, FaLinkedin, FaReddit, FaGithub, FaQuora, FaFacebook } from 'react-icons/fa6'

const Footer = () => {
  const location = useLocation()
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
      py={3} 
      borderTop="1px" 
      borderColor="brand.light"
      position={location.pathname === '/' ? 'fixed' : 'static'}
      bottom={location.pathname === '/' ? '0' : undefined}
      left={location.pathname === '/' ? '0' : undefined}
      right={location.pathname === '/' ? '0' : undefined}
      zIndex={1}
    >
      <Flex 
        align="center" 
        justify="center" 
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 2, sm: 8 }}
      >
        <Link href="mailto:dante.izuogu@proton.me" color="brand.dark" fontSize="sm" textDecoration="underline" _hover={{ color: 'rgba(57, 255, 20, 1)' }}>
          dante.izuogu@proton.me
        </Link>
        <HStack spacing={6}>
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              color="brand.dark"
              _hover={{ color: 'brand.accent' }}
              className="no-underline"
            >
              <social.icon size={18} />
            </Link>
          ))}
        </HStack>
      </Flex>
    </Box>
  )
}

export default Footer 