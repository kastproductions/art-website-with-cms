import matter from 'gray-matter';
import { HomePage } from '../templates/HomePage';

export default function Home({ data }: any) {
  return <HomePage {...data} />;
}

export async function getServerSideProps() {
  const entry = matter.read('./content/pages/home.md');
  return {
    props: { data: entry.data },
  };
}
