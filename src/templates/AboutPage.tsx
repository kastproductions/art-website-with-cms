import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { Container, Box, Heading, HStack, Stack } from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { CmsPreviewWrapper } from '@/utils/CmsPreviewWrapper';

const ogType = 'website';

export function AboutPage({ seo_title, seo_description, body }: any) {
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

      <Stack isInline w="full" spacing={0}>
        <Box w="full">
          <Box as="header">
            <Container maxW="8xl" w="full" py={[10, 10, 20]}>
              <Stack spacing={[2, 2, 20]}>
                <HStack>
                  <Heading as="h1" fontWeight="normal" fontSize={['4xl', '4xl', '7xl']} textAlign="center" maxW="7xl">
                    About me
                  </Heading>
                </HStack>
                <Box w={['full', 'full', '60%']}>
                  <Prose>
                    <Box as={ReactMarkdown}>{body}</Box>
                  </Prose>
                </Box>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export function AboutPagePreview({ entry, widgetFor }: any) {
  const data = {
    body: entry.getIn(['data', 'body']),
  };
  return (
    <CmsPreviewWrapper>
      <AboutPage {...data} />
    </CmsPreviewWrapper>
  );
}
