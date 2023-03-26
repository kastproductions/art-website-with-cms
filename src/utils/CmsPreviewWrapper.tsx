import { Box, ThemeProvider } from '@chakra-ui/react';
import { theme } from '@/pages/_app';
import { CacheProvider } from '@emotion/react';
// @ts-ignore
import createCache from '@emotion/cache';
// @ts-ignore
import weakMemoize from '@emotion/weak-memoize';

const memoizedCreateCacheWithContainer = weakMemoize((container: any) => {
  return createCache({
    key: 'preview',
    container,
  });
});

export function CmsPreviewWrapper({ children }) {
  return (
    <>
      <CacheProvider
        value={memoizedCreateCacheWithContainer(
          (document.getElementById('preview-pane') as any).contentWindow.document.head
        )}
      >
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          ></link>
        </head>
        <ThemeProvider theme={theme}>
          <Box as="main" bg="#EEEEEE" minH="100vh">
            {children}
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
