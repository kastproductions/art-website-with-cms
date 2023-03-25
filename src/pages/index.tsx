import matter from 'gray-matter';
import { HomePage } from '../templates/HomePage';

export default function Home({ data }: any) {
  console.log({ data });
  return <HomePage {...data} />;
}

export async function getStaticProps() {
  const { data: home } = matter.read('./content/pages/home.md');
  const { data: media } = matter.read('./content/global_settings/social_media.md');
  return {
    props: { data: { ...home, ...media } },
    revalidate: 1,
  };
}
