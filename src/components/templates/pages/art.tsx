import ReactMarkdown from 'react-markdown';
import { Container, Box, Heading, HStack, Stack, Img } from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { CmsPreviewWrapper } from '@/utils/CmsPreviewWrapper';

export function ArtPage({ title, description, images }: any) {
  return (
    <Stack spacing={0}>
      <Container maxW="8xl" w="full" py={[10, 10, 20]}>
        <Stack spacing={[10, 20, 40]} direction={['column-reverse', 'row']}>
          <Stack w={['full', '50%']} spacing={[2, 2, 24]}>
            <Box>
              <Img src={`/${images[0].image}`} />
            </Box>
            <Box w="full">
              <Prose>
                <Box as={ReactMarkdown}>{description}</Box>
              </Prose>
            </Box>
          </Stack>
          <Box w={['full', '50%']}>
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
    images: entry.getIn(['data', 'images']),
  };
  return (
    <CmsPreviewWrapper>
      <ArtPage {...data} />
    </CmsPreviewWrapper>
  );
}
