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

  const filesInCollections = fs.readdirSync('./content/collection');

  const collections = filesInCollections.map((filename) => {
    const file = fs.readFileSync(`./content/collection/${filename}`, 'utf8');
    const { data } = matter(file);
    const { portfolio_items } = data;
    const names = portfolio_items.map(({ item }) => item);
    const items = portfolio.filter((p) => names.includes(p.title));
    return { ...data, items };
  });

  return {
    props: { data: { ...data, collections } },
    revalidate: 1,
  };
}
