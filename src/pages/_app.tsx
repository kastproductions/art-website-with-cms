import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import '@fontsource/cardo/400.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/300.css';

const canonicalUrl = `https://jurgauzdilaite.netlify.app/`;
const ogType = 'website';
const site_name = 'Luminous Visions';
const seo_title = `Luminous Visions: The Captivating Art Of Jurga Uzdilaite`;
const seo_description = `Welcome to Luminous Visions, the official online gallery of Jurga Uzdilaite. Dive into a world of amazing creativity, where each piece shares a unique story filled with emotion and depth. As you explore our impressive collection, get ready for a fascinating journey through colour, texture, and form.`;

export const theme = extendTheme(
  {
    fonts: {
      heading: `'Cardo', serif`,
      body: `'Roboto', sans-serif`,
    },
  },
  withProse({
    baseStyle: {
      p: { fontSize: ['md', 'xl'], lineHeight: 'tall', fontWeight: 'normal' },
    },
  })
);
export default function App({ Component, pageProps }: AppProps) {
  // const {
  //   data: { seo_title, seo_description, site_name },
  // } = matter?.read('./content/global_settings/site.md') || { data: {} };

  const router = useRouter();

  const LayoutToUse = router.asPath.startsWith('/admin') ? React.Fragment : Wrapper;

  return (
    <>
      <Head>
        {seo_title && <title>{seo_title}</title>}
        {seo_description && <meta name="description" content={seo_description} />}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:locale" content="en_US" />
        {site_name && <meta property="og:site_name" content={site_name} />}
        <meta property="og:type" content={ogType} />
        {seo_description && <meta property="og:description" content={seo_description} />}
        {/* <meta property="og:image" content={ogImgUrl} /> */}
        <meta property="og:url" content={canonicalUrl} />
      </Head>
      <LayoutToUse>
        <Component {...pageProps} />
      </LayoutToUse>
    </>
  );
}

function Wrapper({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
