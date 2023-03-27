import { Stack, Img, LinkBox, LinkOverlay } from '@chakra-ui/react';
import slugify from 'slugify';
import NextLink from 'next/link';

export function GalleryItem({ title, images }) {
  return (
    <LinkBox as="article" key={title} sx={{ breakInside: 'avoid', mb: [4, 4, 8] }}>
      <Stack>
        <Img src={`/${images[0].image}`} objectFit="contain" />
        <LinkOverlay
          as={NextLink}
          href={`/gallery/${slugify(title, {
            strict: true,
            lower: true,
          })}`}
          textAlign="center"
          fontSize={['sm', 'md']}
        >
          {title}
        </LinkOverlay>
      </Stack>
    </LinkBox>
  );
}
