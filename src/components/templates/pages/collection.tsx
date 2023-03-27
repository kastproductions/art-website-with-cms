import ReactMarkdown from 'react-markdown';
import { Container, Box, Heading, Stack, Img, SimpleGrid } from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { CmsPreviewWrapper } from '@/utils/CmsPreviewWrapper';
import { GalleryItem } from '@/components/gallery-item';
// import { getAsset, getEntry } from 'netlify-cms';
// import React from 'react';
// import { getAsset, getEntry } from 'netlify-cms';

export function CollectionPage({ title, description, items }: any) {
  return (
    <Stack isInline w="full" spacing={0}>
      <Container as="section" maxW="8xl" w="full" py={28}>
        <Stack spacing={[20, 20, 28]}>
          <Stack key={title}>
            <Heading fontSize={['4xl', '4xl', '6xl']} maxW="5xl" fontWeight="normal">
              {title}
            </Heading>
            <Box w={['full', 'full', '60%']}>
              <Prose>
                <Box as={ReactMarkdown}>{description}</Box>
              </Prose>
            </Box>
            <Box sx={{ columnCount: [2, 3, 4], columnGap: [4, 4, 8] }} pt={[6, 6, 10]}>
              {items?.map((props) => (
                <GalleryItem key={props.name} {...props} />
              ))}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}

export function CollectionPagePreview({ entry, widgetFor }: any) {
  const data = {
    title: entry.getIn(['data', 'title']),
    description: entry.getIn(['data', 'description']),
    items: [],
  };

  return (
    <CmsPreviewWrapper>
      <CollectionPage {...data} />
    </CmsPreviewWrapper>
  );
}
