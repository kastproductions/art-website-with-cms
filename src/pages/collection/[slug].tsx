import matter from 'gray-matter';
import fs from 'fs';
import Head from 'next/head';
import { Layout } from '@/components/layout';
import { CollectionPage } from '@/components/templates/pages/collection';
import slugify from 'slugify';

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
        <CollectionPage {...rest} />
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  // const { data } = matter.read('./content/pages/home.md');
  const {
    data: { social_media_links },
  } = matter.read('./content/site_settings/social_media_links.md');

  const filesInPortfolio = fs.readdirSync('./content/portfolio');
  // Get the front matter and slug (the filename without .md) of all files
  const portfolio = filesInPortfolio.map((filename) => {
    const file = fs.readFileSync(`./content/portfolio/${filename}`, 'utf8');
    const { data } = matter(file);
    return data;
  });

  const filesInCollections = fs.readdirSync('./content/collection');

  const collection = filesInCollections.reduce((acc, filename) => {
    const file = fs.readFileSync(`./content/collection/${filename}`, 'utf8');
    const { data } = matter(file);
    const slug = slugify(data.title, {
      strict: true,
      lower: true,
    });
    if (slug === params.slug) {
      const names = data.portfolio_items.map(({ item }) => item);
      const items = portfolio.filter((p) => names.includes(p.title));
      data.items = items;
      acc = data;
    }
    return acc;
  }, {});

  return {
    props: { data: { ...collection, social_media_links } },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const filesInCollections = fs.readdirSync('./content/collection');

  const paths = filesInCollections.map((filename) => {
    const file = fs.readFileSync(`./content/collection/${filename}`, 'utf8');
    const { data } = matter(file);
    return {
      params: {
        slug: slugify(data.title, {
          strict: true,
          lower: true,
        }),
      },
    };
  });

  return { paths, fallback: 'blocking' };
}
