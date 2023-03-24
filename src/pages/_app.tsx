import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';

const canonicalUrl = `https://jurgauzdilaite.netlify.app/`;
const description = `Jurga has refined their artistic prowess over years of devoted practice, culminating in a distinguished style that harmonises the ageless elegance of traditional techniques with the limitless potential of modern innovation. Within this space, you'll uncover a diverse range of artwork, from bewitching landscapes and hypnotic abstracts to poignant portraits and delightful still lifes.`;
const ogType = 'website';

const globalMeta = {
  siteName: 'Luminous Visions',
  ogType: '',
};

export const theme = extendTheme({}, withProse());
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const LayoutToUse = router.asPath.startsWith('/admin') ? React.Fragment : ChakraProvider;

  return (
    <>
      <Head>
        <title>Luminous Visions: The Enchanting Artistry of Jurga Uzdilaite</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={globalMeta.siteName} />
        <meta property="og:type" content={ogType} />
        <meta property="og:description" content={description} />
        {/* <meta property="og:image" content={ogImgUrl} /> */}
        <meta property="og:url" content={canonicalUrl} />
      </Head>
      <LayoutToUse theme={theme}>
        <Component {...pageProps} />
      </LayoutToUse>
    </>
  );
}
