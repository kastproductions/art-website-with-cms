import { Container, Box, Heading, HStack, Stack } from '@chakra-ui/react';
import { GalleryItem } from '@/components/gallery-item';

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
                <Box sx={{ columnCount: [2, 3, 4], columnGap: [4, 4, 8] }} pt={[6, 6, 10]}>
                  {art?.map((props) => (
                    <GalleryItem key={props.title} {...props} />
                  ))}
                </Box>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Stack>
  );
}
