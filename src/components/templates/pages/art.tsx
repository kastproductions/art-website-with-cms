import ReactMarkdown from 'react-markdown';
import { Container, Box, Heading, Stack, Img, SimpleGrid } from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { CmsPreviewWrapper } from '@/utils/CmsPreviewWrapper';

export function ArtPage({ title, description, images }: any) {
  return (
    <Stack spacing={0} w="full">
      <Container maxW="8xl" w="full" py={[10, 10, 20]}>
        <Stack spacing={[10, 20, 40]} direction={['column-reverse', 'column-reverse', 'row']} w="full">
          <Stack w={['full', 'full', '50%']} spacing={[2, 2, 24]}>
            <Stack w="full" spacing={4}>
              <Img src={`/${images?.[0]?.image}`} />
              <SimpleGrid columns={4} spacing={4}>
                {images?.map(({ image }) => {
                  return (
                    <Stack key={image}>
                      <Img src={'/' + image} />
                    </Stack>
                  );
                })}
              </SimpleGrid>
            </Stack>
            <Box w="full">
              <Prose>
                <Box as={ReactMarkdown}>{description}</Box>
              </Prose>
            </Box>
          </Stack>
          <Box w={['full', 'full', '50%']}>
            <Heading as="h1" fontWeight="normal" fontSize={['3xl', '5xl']}>
              {title}
            </Heading>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
}

export function ArtPagePreview({ entry, widgetFor }: any) {
  const data = {
    title: entry.getIn(['data', 'title']),
    description: entry.getIn(['data', 'description']),
    images: entry.getIn(['data', 'images']) ? entry.getIn(['data', 'images']).toJS() : [],
  };

  return (
    <CmsPreviewWrapper>
      <ArtPage {...data} />
    </CmsPreviewWrapper>
  );
}
