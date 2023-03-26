import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import {
  Container,
  Box,
  Heading,
  ThemeProvider,
  HStack,
  Stack,
  Img,
  SimpleGrid,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  IconButton,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { theme } from '@/pages/_app';
// @ts-ignore
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
// @ts-ignore
import weakMemoize from '@emotion/weak-memoize';
import React from 'react';
import { FiMenu, FiX, FiFacebook, FiInstagram, FiMail } from 'react-icons/fi';
const ogType = 'website';
import NextLink from 'next/link';

const icon = {
  email: FiMail,
  facebook: FiFacebook,
  instagram: FiInstagram,
};

export function Layout({ children, social_media_links }: any) {
  return (
    <>
      <Box as="header" bg="#EEEEEE">
        <Container as="nav" maxW="8xl" w="full">
          <HStack h={[16, 24]}>
            <Box flex={1} pt={1.5}>
              <DrawerExample social_media_links={social_media_links} />
            </Box>
            <HStack justify="center" flex={1}>
              <Link as={NextLink} href="/">
                <Heading as="span" fontSize={['4xl', '5xl']}>
                  JU
                </Heading>
              </Link>
            </HStack>
            <Box flex={1} />
          </HStack>
        </Container>
      </Box>
      <Box as="main" bg="#EEEEEE" minH="100vh">
        {children}
      </Box>
      <Box as="footer" bg="#EEEEEE" w="full" py={10}>
        <Container maxW="8xl" w="full">
          <Text textAlign="center">
            Copyright © 2023{' '}
            <Link href="https://kastproductions.com" isExternal>
              Kast Productions
            </Link>
          </Text>
        </Container>
      </Box>
    </>
  );
}

function DrawerExample({ social_media_links }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = React.useRef();
  // const isOpen = true;

  const emailUrl = social_media_links.find(({ name }) => name === 'email')?.url;

  return (
    <>
      <IconButton
        variant="link"
        color="gray.900"
        icon={<FiMenu fontSize="2rem" />}
        aria-label="menu"
        ref={btnRef}
        onClick={onOpen}
      />

      <Drawer size="sm" isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <Box py={8} px={12} bg="#EEEEEE">
            <Button
              onClick={onClose}
              variant="link"
              leftIcon={<FiX fontSize="2rem" />}
              color="gray.900"
              fontSize="lg"
              fontWeight="normal"
            >
              Close
            </Button>
          </Box>
          <DrawerBody
            px={12}
            pb={12}
            bg="#EEEEEE"
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            h="full"
          >
            <Stack>
              <Stack spacing={1}>
                <Link
                  // as={NextLink}
                  // href="/"
                  color="gray.400"
                  fontSize="4xl"
                  variant="link"
                  justifyContent="start"
                  fontWeight="normal"
                  _hover={{ textDecor: 'none' }}
                >
                  Shop
                </Link>
                <Link
                  as={NextLink}
                  href="/gallery"
                  color="gray.900"
                  fontSize="4xl"
                  variant="link"
                  justifyContent="start"
                  fontWeight="normal"
                >
                  Gallery
                </Link>
              </Stack>
              <Stack pt={10}>
                <Link
                  as={NextLink}
                  href="/about-me"
                  fontSize="xl"
                  color="gray.900"
                  variant="link"
                  justifyContent="start"
                  fontWeight="normal"
                >
                  About me
                </Link>

                <Link
                  fontSize="xl"
                  color="gray.900"
                  variant="link"
                  justifyContent="start"
                  fontWeight="normal"
                  isExternal
                  href={emailUrl ? `mailto:${emailUrl}` : '/'}
                >
                  Get in touch
                </Link>
              </Stack>
            </Stack>

            <HStack spacing={4}>
              {social_media_links.map(({ name, url }) => {
                const Icon = icon[name];
                return (
                  <Link key={name} isExternal href={name === 'email' ? `mailto:${url}` : url}>
                    <Icon fontSize={name === 'email' ? '2rem' : '1.8rem'} />
                  </Link>
                );
              })}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
