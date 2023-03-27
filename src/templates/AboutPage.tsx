import ReactMarkdown from 'react-markdown';
import { Container, Box, Heading, HStack, Stack } from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { CmsPreviewWrapper } from '@/utils/CmsPreviewWrapper';

export function AboutPage({ body }: any) {
  return (
    <Stack isInline w="full" spacing={0}>
      <Box w="full">
        <Box>
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
