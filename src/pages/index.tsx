import matter from 'gray-matter';
import { HomePage } from '../templates/HomePage';

export default function Home({ data }: any) {
  console.log({ data });
  return <HomePage {...data} />;
}

export async function getStaticProps() {
  const { data } = matter.read('./content/pages/home.md');
  return {
    props: { data },
    revalidate: 1,
  };
}
