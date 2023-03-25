import matter from 'gray-matter';
import { HomePage } from '../templates/HomePage';
import fs from 'fs';

export default function Home({ data }: any) {
  return <HomePage {...data} />;
}

export async function getStaticProps() {
  const { data } = matter.read('./content/pages/home.md');

  const filesInPortfolio = fs.readdirSync('./content/portfolio');
  // Get the front matter and slug (the filename without .md) of all files
  const portfolio = filesInPortfolio.map((filename) => {
    const file = fs.readFileSync(`./content/portfolio/${filename}`, 'utf8');
    const { data } = matter(file);
    return data;
  });

  return {
    props: { data: { ...data, portfolio } },
    revalidate: 1,
  };
}
