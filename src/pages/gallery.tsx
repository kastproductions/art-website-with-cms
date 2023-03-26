import { Layout } from '@/components/layout';
import matter from 'gray-matter';
import Head from 'next/head';
import { GalleryPage } from '../templates/GalleryPage';
import fs from 'fs';

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
        <GalleryPage {...rest} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { data } = matter.read('./content/pages/home.md');
  const {
    data: { social_media_links },
  } = matter.read('./content/site_settings/social_media_links.md');
  const filesInPortfolio = fs.readdirSync('./content/portfolio');
  // Get the front matter and slug (the filename without .md) of all files
  const art = filesInPortfolio.map((filename) => {
    const file = fs.readFileSync(`./content/portfolio/${filename}`, 'utf8');
    const { data } = matter(file);
    return data;
  });

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
    props: { data: { ...data, art, social_media_links } },
    revalidate: 1,
  };
}
