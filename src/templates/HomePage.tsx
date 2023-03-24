import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { Container, Box, Heading, ThemeProvider, HStack, Stack, Img } from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { theme } from '@/pages/_app';
// @ts-ignore
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
// @ts-ignore
import weakMemoize from '@emotion/weak-memoize';

const canonicalUrl = `https://jurgauzdilaite.netlify.app/`;
const ogType = 'website';

const globalMeta = {
  siteName: 'Luminous Visions',
};

export function HomePage({ heading, intro, seo_title, seo_description, image }: any) {
  return (
    <>
      <Head>
        {seo_title && <title>{seo_title}</title>}
        {seo_description && <meta name="description" content={seo_description} />}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={globalMeta.siteName} />
        <meta property="og:type" content={ogType} />
        {seo_description && <meta property="og:description" content={seo_description} />}
        {/* <meta property="og:image" content={ogImgUrl} /> */}
        <meta property="og:url" content={canonicalUrl} />
      </Head>
      <Box as="main">
        <Box as="header" bg="#24372A" color="white">
          <Container maxW="8xl" w="full" py={20}>
            <Stack spacing={10}>
              <HStack justify="center">
                <Heading
                  as="h1"
                  fontWeight="normal"
                  fontSize={['4xl', '8xl']}
                  textAlign="center"
                  maxW="4xl"
                  textTransform="capitalize"
                >
                  {heading}
                </Heading>
              </HStack>
              <HStack justify="center">
                <Prose>
                  <Box maxW="4xl" sx={{ img: { objectFit: 'cover', w: 'full', maxH: '50vh' } }} as={ReactMarkdown}>
                    {intro}
                  </Box>
                </Prose>
              </HStack>
              <Img src={image} maxH="50vh" objectFit="contain" w="full" alt="Jurga at workshop" />
            </Stack>
          </Container>
        </Box>
        <Box as="section" bg="#F4F2F0">
          <Container maxW="8xl" w="full" py={20}>
            <HStack justify="center">
              <Heading
                as="h1"
                fontWeight="normal"
                fontSize={['4xl', '8xl']}
                textAlign="center"
                maxW="4xl"
                textTransform="capitalize"
              >
                The Best Work
              </Heading>
            </HStack>
          </Container>
        </Box>
      </Box>
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

  console.log({ data });
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
