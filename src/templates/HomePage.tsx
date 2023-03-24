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

export function HomePage({ title = 'hi', intro = 'ho' }: any) {
  return (
    <Box as="main">
      <Container maxW="8xl" w="full" py={20}>
        <Heading as="h1" fontWeight="bold">
          {title || 'Hello'}
        </Heading>
        <Prose>
          <Box as={ReactMarkdown}>{intro}</Box>
        </Prose>
      </Container>
    </Box>
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
    title: entry.getIn(['data', 'title']),
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
