import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import HomePagePreview from '../templates/HomePage';
// import { theme } from './_app';
// import dynamic from 'next/dynamic';
// @ts-ignore
// const CMS = dynamic(() => import('netlify-cms-app'), { ssr: false });
// import cms from 'netlify-cms-app';
const config = {
  backend: {
    name: 'git-gateway',
    branch: 'main', // Branch to update (optional; defaults to master)
  },
  media_folder: 'public/uploads',
  public_folder: 'uploads',
  collections: [
    {
      name: 'blog',
      label: 'Blog',
      folder: 'content/blog',
      create: true,
      fields: [
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'description', label: 'Description', widget: 'text' },
        {
          name: 'body',
          label: 'Body',
          widget: 'markdown',
        },
      ],
    },
  ],
};

// const CMS = dynamic(
//   () =>
//     import('netlify-cms-app').then((cms) => {
//       cms.init({ config });
//     }),
//   { ssr: false, loading: () => <p>Loading...</p> }
// );

// function TestTemplate(props) {
//   return (
//     <ChakraProvider theme={theme}>
//       <HomePagePreview {...props} />
//     </ChakraProvider>
//   );
// }
const Admin = () => {
  useEffect(() => {
    (async () => {
      const CMS = (await import('netlify-cms-app')).default;
      // @ts-ignore
      CMS.init();
      // @ts-ignore

      // @ts-ignore
      CMS.registerPreviewTemplate('home', HomePagePreview);
    })();
  }, []);

  return null;
  // return <div />;
  // return <div id="nc-root" key={1} />;
};

export default Admin;

// - name: 'blog' # Used in routes, e.g., /admin/collections/blog
// label: 'Blog' # Used in the UI
// folder: 'content/blogs' # The path to the folder where the documents are stored
// create: true # Allow users to create new documents in this collection
// slug: '{{slug}}' # Filename template, e.g., YYYY-MM-DD-title.md
// fields: # The fields for each document, usually in front matter
//   - { label: 'Title', name: 'title', widget: 'string' }
//   - { label: 'Publish Date', name: 'date', widget: 'datetime', date_format: 'DD.MM.YYYY', time_format: 'HH:mm', format: 'LLL' }
//   - { label: 'Body', name: 'body', widget: 'markdown' }
