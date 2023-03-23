import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';

export const theme = extendTheme({}, withProse());
export default function App({ Component, pageProps }: AppProps) {
  // const router = useRouter()

  // const LayoutToUse = router.asPath.startsWith('/admin')
  // ? React.Fragment
  // : Layout

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
