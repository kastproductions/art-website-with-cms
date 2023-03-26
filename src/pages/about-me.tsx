import matter from 'gray-matter';
import { AboutPage } from '../templates/AboutPage';

export default function Home({ data }: any) {
  return <AboutPage {...data} />;
}

export async function getStaticProps() {
  const data = matter.read('./content/pages/about.md');
  return {
    props: { data: { body: data.content } },
    revalidate: 1,
  };
}
