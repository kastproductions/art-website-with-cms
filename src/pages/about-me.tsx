import { Layout } from '@/components/layout';
import matter from 'gray-matter';
import Head from 'next/head';
import { AboutPage } from '../templates/AboutPage';

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
        <AboutPage {...rest} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { content } = matter.read('./content/pages/about.md');
  const {
    data: { social_media_links },
  } = matter.read('./content/site_settings/social_media_links.md');
  return {
    props: { data: { body: content, social_media_links } },
    revalidate: 1,
  };
}
