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

export function HomePage({ heading, intro, seo_title, seo_description, image, collections }: any) {
  const { isOpen, onClose, onOpen, onToggle } = useDrawer();

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

      <Box as="main" bg="#EEEEEE">
        <Container maxW="8xl" w="full">
          <HStack h={[16, 24]}>
            <Box flex={1} pt={1.5}>
              <DrawerExample />
            </Box>
            <HStack justify="center" flex={1}>
              <Heading as="span" fontSize={['4xl', '5xl']}>
                JAO
              </Heading>
            </HStack>
            <Box flex={1} />
          </HStack>
        </Container>
        <Stack isInline w="full" spacing={0}>
          <DSSrawer />
          <Box w="full">
            <Box as="header">
              <Container maxW="7xl" w="full" py={[10, 10, 20]}>
                <Stack spacing={[2, 2, 20]}>
                  <HStack justify="center">
                    <Heading as="h1" fontWeight="normal" fontSize={['4xl', '4xl', '8xl']} textAlign="center" maxW="7xl">
                      {heading}
                    </Heading>
                  </HStack>
                  <Stack direction={['column-reverse', 'column-reverse', 'row']} justify="center" spacing={[0, 0, 12]}>
                    {image && (
                      <Box w={['full', 'full', '40%']}>
                        <Img src={image} objectFit="contain" w="full" alt="Jurga at workshop" />
                      </Box>
                    )}
                    <Box w={['full', 'full', '60%']}>
                      <Prose>
                        <Box as={ReactMarkdown}>{intro}</Box>
                      </Prose>
                    </Box>
                  </Stack>
                </Stack>
              </Container>
            </Box>
            <Box>
              <Container as="section" maxW="8xl" w="full" py={28}>
                <Stack spacing={[20, 20, 28]}>
                  {collections?.map(({ title, items }) => {
                    return (
                      <Stack key={title}>
                        <Heading fontSize={['5xl', '5xl', '7xl']} fontWeight="normal">
                          {title}
                        </Heading>
                        <SimpleGrid columns={[1, 2, 4]} spacing={8} pt={[6, 6, 10]}>
                          {items?.map(({ title, images }) => {
                            return (
                              <Stack key={title}>
                                <Img src={images[0].image} objectFit="cover" h={64} />
                                <Text textAlign="center">{title}</Text>
                              </Stack>
                            );
                          })}
                        </SimpleGrid>
                      </Stack>
                    );
                  })}
                </Stack>
              </Container>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

import { proxy, useSnapshot } from 'valtio';

const state = proxy({
  isOpen: false,
  onOpen: () => {
    state.isOpen = true;
  },
  onClose: () => {
    state.isOpen = false;
  },
  onToggle: () => {
    state.isOpen = !state.isOpen;
  },
});

function useDrawer() {
  return useSnapshot(state);
}

import { useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';

function DSSrawer() {
  // const { getButtonProps, getDisclosureProps } = useDisclosure();
  // const [hidden, setHidden] = useState(!isOpen);
  const { isOpen, onClose } = useDrawer();
  // const [width, setWidth] = React.useState(0);
  // const button = React.cloneElement()

  return (
    <Box
      as={motion.div}
      bg="white"
      initial={false}
      animate={{ width: isOpen ? 500 : 0 }}
      overflow="hidden"
      whiteSpace="nowrap"
      height="100vh"
      overflowY="auto"
      right="0"
      top="0"
    >
      welcome home
    </Box>
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
                href="/"
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

export default function HomePagePreview({ entry, widgetFor }: any) {
  const data = {
    seo_title: entry.getIn(['data', 'seo_title']),
    seo_description: entry.getIn(['data', 'seo_description']),
    heading: entry.getIn(['data', 'heading']),
    intro: entry.getIn(['data', 'intro']),
    image: entry.getIn(['data', 'image']),
  };

  return (
    <CacheProvider
      value={memoizedCreateCacheWithContainer(
        (document.getElementById('preview-pane') as any).contentWindow.document.head
      )}
    >
      <ThemeProvider theme={theme}>
        <HomePage {...data} />
      </ThemeProvider>
    </CacheProvider>
  );
}
