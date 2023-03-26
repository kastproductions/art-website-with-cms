import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { Container, Box, Heading, HStack, Stack, Img, SimpleGrid, Text } from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { CmsPreviewWrapper } from '@/utils/CmsPreviewWrapper';
const ogType = 'website';

export function HomePage({ heading, intro, seo_title, seo_description, image, collections }: any) {
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
            <Container maxW="7xl" w="full" py={[10, 10, 20]}>
              <Stack spacing={[2, 2, 20]}>
                <HStack justify="center">
                  <Heading as="h1" fontWeight="normal" fontSize={['4xl', '4xl', '8xl']} textAlign="center" maxW="7xl">
                    {heading}
                  </Heading>
                </HStack>
                <Stack direction={['column-reverse', 'column-reverse', 'row']} justify="center" spacing={[0, 0, 12]}>
                  {image && (
                    <Box w={['full', 'full', '40%']}>
                      <Img src={image} objectFit="contain" w="full" alt="Jurga at workshop" />
                    </Box>
                  )}
                  <Box w={['full', 'full', '60%']}>
                    <Prose>
                      <Box as={ReactMarkdown}>{intro}</Box>
                    </Prose>
                  </Box>
                </Stack>
              </Stack>
            </Container>
          </Box>
          <Box>
            <Container as="section" maxW="8xl" w="full" py={28}>
              <Stack spacing={[20, 20, 28]}>
                {collections?.map(({ title, items }) => {
                  return (
                    <Stack key={title}>
                      <Heading fontSize={['5xl', '5xl', '7xl']} fontWeight="normal">
                        {title}
                      </Heading>
                      <SimpleGrid columns={[1, 2, 4]} spacing={8} pt={[6, 6, 10]}>
                        {items?.map(({ title, images }) => {
                          return (
                            <Stack key={title}>
                              <Img src={images[0].image} objectFit="cover" h={64} />
                              <Text textAlign="center">{title}</Text>
                            </Stack>
                          );
                        })}
                      </SimpleGrid>
                    </Stack>
                  );
                })}
              </Stack>
            </Container>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export function HomePagePreview({ entry, widgetFor }: any) {
  const data = {
    seo_title: entry.getIn(['data', 'seo_title']),
    seo_description: entry.getIn(['data', 'seo_description']),
    heading: entry.getIn(['data', 'heading']),
    intro: entry.getIn(['data', 'intro']),
    image: entry.getIn(['data', 'image']),
  };

  return (
    <CmsPreviewWrapper>
      <HomePage {...data} />
    </CmsPreviewWrapper>
  );
}
