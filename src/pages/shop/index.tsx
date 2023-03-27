import matter from 'gray-matter';
// import { HomePage } from '../templates/HomePage';
import fs from 'fs';
import Head from 'next/head';
import { Layout } from '@/components/layout';
import { Heading, Container, Stack, HStack, Text } from '@chakra-ui/react';

export default function Page({ data }: any) {
  const { seo_title, seo_description, social_media_links, ...rest } = data;
  return (
    <>
      <Head>
        {seo_title && <title>{seo_title}</title>}
        {seo_description && <meta name="description" content={seo_description} />}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content="website" />
        {seo_description && <meta property="og:description" content={seo_description} />}
        {/* <meta property="og:site_name" content={globalMeta.siteName} /> */}
        {/* <meta property="og:image" content={ogImgUrl} /> */}
      </Head>
      <Layout social_media_links={social_media_links}>
        <Container maxW="8xl" w="full" py={[10, 10, 20]}>
          <Stack spacing={[10, 10, 20]}>
            <HStack>
              <Heading as="h1" fontWeight="normal" fontSize={['4xl', '4xl', '7xl']} textAlign="center" maxW="7xl">
                Shop
              </Heading>
            </HStack>
            <Text fontSize={['md', 'xl']} color="gray.500">
              Sold out. Please contact me via email if you would like to place an order.
            </Text>
            {/* <Box w={['full', 'full', '60%']}>
                <Prose>
                  <Box as={ReactMarkdown}>{body}</Box>
                </Prose>
              </Box> */}
          </Stack>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  // const { data } = matter.read('./content/pages/home.md');
  const {
    data: { social_media_links },
  } = matter.read('./content/site_settings/social_media_links.md');
  // const filesInPortfolio = fs.readdirSync('./content/portfolio');
  // // Get the front matter and slug (the filename without .md) of all files
  // const portfolio = filesInPortfolio.map((filename) => {
  //   const file = fs.readFileSync(`./content/portfolio/${filename}`, 'utf8');
  //   const { data } = matter(file);
  //   return data;
  // });

  // const filesInCollections = fs.readdirSync('./content/collection');

  // const collections = filesInCollections.map((filename) => {
  //   const file = fs.readFileSync(`./content/collection/${filename}`, 'utf8');
  //   const { data } = matter(file);
  //   const { portfolio_items } = data;
  //   const names = portfolio_items.map(({ item }) => item);
  //   const items = portfolio.filter((p) => names.includes(p.title));
  //   return { ...data, items };
  // });

  return {
    props: { data: { social_media_links } },
    revalidate: 1,
  };
}
