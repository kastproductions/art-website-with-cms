import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { Container, Box, Heading, ThemeProvider } from '@chakra-ui/react';
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

export function HomePage({ heading, intro, seo_title, seo_description }: any) {
  return (
    <>
      <Head>
        <title>{seo_title}</title>
        <meta name="description" content={seo_description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={globalMeta.siteName} />
        <meta property="og:type" content={ogType} />
        <meta property="og:description" content={seo_description} />
        {/* <meta property="og:image" content={ogImgUrl} /> */}
        <meta property="og:url" content={canonicalUrl} />
      </Head>
      <Box as="main">
        <Container maxW="8xl" w="full" py={20}>
          <Heading as="h1" fontWeight="bold">
            {heading}
          </Heading>
          <Prose>
            <Box as={ReactMarkdown}>{intro}</Box>
          </Prose>
        </Container>
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
