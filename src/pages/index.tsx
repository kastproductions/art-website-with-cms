import Head from 'next/head';
// import { Inter } from 'next/font/google';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { Container, Box, Text, Heading } from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import HomePageTemplate from '../templates/HomePage';
import { Map } from 'immutable';

export default function Home({ entry }: any) {
  const deepData = Map(entry);
  return <HomePageTemplate entry={deepData} />;
}

export async function getStaticProps() {
  const entry = matter.read('./content/pages/home.md');
  return {
    props: { entry },
  };
}
