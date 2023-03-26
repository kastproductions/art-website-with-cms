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
    <CacheProvider
      value={memoizedCreateCacheWithContainer(
        (document.getElementById('preview-pane') as any).contentWindow.document.head
      )}
    >
      <ThemeProvider theme={theme}>
        <Box as="main" bg="#EEEEEE">
          {children}
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
