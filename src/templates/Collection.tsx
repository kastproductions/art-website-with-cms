import ReactMarkdown from 'react-markdown';
import { Container, Box, Heading, HStack, Stack } from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { CmsPreviewWrapper } from '@/utils/CmsPreviewWrapper';

export function Collection({ title, description, portfolio_items }) {
  return (
    <Container as="section" maxW="8xl" w="full" py={28}>
      {/* <Stack spacing={[20, 20, 28]}>
        {collections?.map(({ title, items }) => {
          return (
            <Stack key={title}>
              <Heading fontSize={['4xl', '4xl', '6xl']} maxW="5xl" fontWeight="normal">
                {title}
              </Heading>
              <Box
                pt={[8, 8, 10]}
                sx={{
                  columnCount: [2, 3, 4],
                  columnGap: [2, 4, 8],
                }}
              >
                {items?.map(({ title, images }) => {
                  return (
                    <Stack key={title} sx={{ breakInside: 'avoid', mb: 6 }}>
                      <Img src={images[0].image} />
                      <Text textAlign="center">{title}</Text>
                    </Stack>
                  );
                })}
              </Box>
            </Stack>
          );
        })}
      </Stack> */}
    </Container>
  );
}

export function CollectionPreview({ entry, widgetFor }: any) {
  const data = {
    title: entry.getIn(['data', 'title']),
    description: entry.getIn(['data', 'description']),
    portfolio_items: entry.getIn(['data', 'portfolio_items']),
  };
  const dataRaw = entry.get('data');
  console.log({ dataRaw });

  return (
    <CmsPreviewWrapper>
      <Collection {...data} />
    </CmsPreviewWrapper>
  );
}
