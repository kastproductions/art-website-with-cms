import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';

const theme = extendTheme({}, withProse());
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
