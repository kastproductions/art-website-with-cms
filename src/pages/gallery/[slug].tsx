import matter from 'gray-matter';
import fs from 'fs';
import Head from 'next/head';
import { Layout } from '@/components/layout';
import { ArtPage } from '@/components/templates/pages/art';
import slugify from 'slugify';

export default function Page({ data }: any) {
  const { seo_title, seo_description, social_media_links, ...rest } = data;
  console.log({ rest });

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
        <ArtPage {...rest} />
      </Layout>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
  const filesInPortfolio = fs.readdirSync('./content/portfolio');
  // Get the front matter and slug (the filename without .md) of all files
  const art = filesInPortfolio.reduce((acc, filename) => {
    const file = fs.readFileSync(`./content/portfolio/${filename}`, 'utf8');
    const { data } = matter(file);
    const slug = slugify(data.title, {
      strict: true,
      lower: true,
    });
    if (slug === params.slug) acc = data;
    return acc;
  }, {});

  const {
    data: { social_media_links },
  } = matter.read('./content/site_settings/social_media_links.md');

  return {
    props: {
      data: { ...art, social_media_links },
    },
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const filesInPortfolio = fs.readdirSync('./content/portfolio');

  const paths = filesInPortfolio.map((filename) => {
    const file = fs.readFileSync(`./content/portfolio/${filename}`, 'utf8');
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

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}
