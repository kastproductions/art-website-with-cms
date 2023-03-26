import ReactMarkdown from 'react-markdown';
import { Container, Box, Heading, HStack, Stack } from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { CmsPreviewWrapper } from '@/utils/CmsPreviewWrapper';

export function CollectionPage({ title, description, portfolio_items }: any) {
  return (
    <Stack isInline w="full" spacing={0}>
      <Box w="full">
        <Box>
          <Container maxW="8xl" w="full" py={[10, 10, 20]}>
            <Stack spacing={[2, 2, 20]}>
              <HStack>
                <Heading as="h1" fontWeight="normal" fontSize={['4xl', '4xl', '7xl']} textAlign="center" maxW="7xl">
                  {title}
                </Heading>
              </HStack>
              <Box w={['full', 'full', '60%']}>
                <Prose>
                  <Box as={ReactMarkdown}>{description}</Box>
                </Prose>
              </Box>
            </Stack>
            <Box as="pre">{JSON.stringify(portfolio_items, null, 2)}</Box>
          </Container>
        </Box>
      </Box>
    </Stack>
  );
}

export function CollectionPagePreview({ entry, widgetFor }: any) {
  const data = {
    title: entry.getIn(['data', 'title']),
    description: entry.getIn(['data', 'description']),
    portfolio_items: entry.getIn(['data', 'portfolio_items']),
  };

  const res = entry.get('data');
  console.log({ res });
  return (
    <CmsPreviewWrapper>
      <CollectionPage {...data} />
    </CmsPreviewWrapper>
  );
}
