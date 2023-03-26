import ReactMarkdown from 'react-markdown';
import { Container, Box, Heading, HStack, Stack, Img, Text } from '@chakra-ui/react';
// import { Prose } from '@nikolovlazar/chakra-ui-prose';
// import { CmsPreviewWrapper } from '@/utils/CmsPreviewWrapper';

export function GalleryPage({ art }: any) {
  return (
    <Stack isInline w="full" spacing={0}>
      <Box w="full">
        <Box as="header">
          <Container maxW="8xl" w="full" py={[10, 10, 20]}>
            <Stack spacing={[2, 2, 20]}>
              <HStack>
                <Heading as="h1" fontWeight="normal" fontSize={['4xl', '4xl', '7xl']} textAlign="center" maxW="7xl">
                  Gallery
                </Heading>
              </HStack>
              <Stack spacing={[10, 10, 28]} w="full">
                <Box sx={{ columnCount: [2, 3, 4], columnGap: [2, 4, 8] }} pt={[6, 6, 10]}>
                  {art?.map(({ title, images }) => {
                    return (
                      <Stack key={title} sx={{ breakInside: 'avoid', mb: 6 }}>
                        <Img src={images[0].image} />
                        <Text textAlign="center" fontSize={['sm', 'md']}>
                          {title}
                        </Text>
                      </Stack>
                    );
                  })}
                </Box>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Stack>
  );
}
