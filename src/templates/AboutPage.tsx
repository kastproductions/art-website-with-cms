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
import { FiMenu, FiX } from 'react-icons/fi';
const ogType = 'website';
import NextLink from 'next/link';

export function AboutPage({ seo_title, seo_description, content }: any) {
  return (
    <>
      <Head>
        {seo_title && <title>{seo_title}</title>}
        {seo_description && <meta name="description" content={seo_description} />}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content={ogType} />
        {seo_description && <meta property="og:description" content={seo_description} />}
        {/* <meta property="og:site_name" content={globalMeta.siteName} /> */}
        {/* <meta property="og:image" content={ogImgUrl} /> */}
      </Head>

      <Box as="main" bg="#EEEEEE" minH="100vh">
        <Container maxW="8xl" w="full">
          <HStack h={[16, 24]}>
            <Box flex={1} pt={1.5}>
              <DrawerExample />
            </Box>
            <HStack justify="center" flex={1}>
              <Link as={NextLink} href="/">
                <Heading as="span" fontSize={['4xl', '5xl']}>
                  JAO
                </Heading>
              </Link>
            </HStack>
            <Box flex={1} />
          </HStack>
        </Container>
        <Stack isInline w="full" spacing={0}>
          <Box w="full">
            <Box as="header">
              <Container maxW="8xl" w="full" py={[10, 10, 20]}>
                <Stack spacing={[2, 2, 20]}>
                  <HStack>
                    <Heading as="h1" fontWeight="normal" fontSize={['4xl', '4xl', '7xl']} textAlign="center" maxW="7xl">
                      About me
                    </Heading>
                  </HStack>
                  <Box w={['full', 'full', '60%']}>
                    <Prose>
                      <Box as={ReactMarkdown}>{content}</Box>
                    </Prose>
                  </Box>
                </Stack>
              </Container>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

function DrawerExample() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = React.useRef();
  // const isOpen = true;
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
          <DrawerBody px={12} pb={8} bg="#EEEEEE">
            <Stack spacing={1}>
              <Link
                as={NextLink}
                href="/"
                color="gray.900"
                fontSize="4xl"
                variant="link"
                justifyContent="start"
                fontWeight="normal"
              >
                Shop
              </Link>
              <Link
                as={NextLink}
                href="/"
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
                as={NextLink}
                href="/"
                fontSize="xl"
                color="gray.900"
                variant="link"
                justifyContent="start"
                fontWeight="normal"
              >
                Get in touch
              </Link>
            </Stack>
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}

const memoizedCreateCacheWithContainer = weakMemoize((container: any) => {
  return createCache({
    key: 'preview',
    container,
  });
});

export default function AboutPagePreview({ entry, widgetFor }: any) {
  const data = {
    body: entry.getIn(['data', 'body']),
  };

  return (
    <CacheProvider
      value={memoizedCreateCacheWithContainer(
        (document.getElementById('preview-pane') as any).contentWindow.document.head
      )}
    >
      <ThemeProvider theme={theme}>
        <AboutPage {...data} />
      </ThemeProvider>
    </CacheProvider>
  );
}
