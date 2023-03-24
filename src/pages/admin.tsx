import { useEffect } from 'react';
import HomePagePreview from '../templates/HomePage';

const config = {
  backend: {
    name: 'git-gateway',
    branch: 'main',
  },
  media_folder: 'public/uploads',
  public_folder: 'uploads',
  publish_mode: 'editorial_workflow',
  collections: [
    {
      name: 'pages',
      label: 'Pages',
      files: [
        {
          label: 'Home Page',
          name: 'home',
          file: 'content/pages/home.md',
          fields: [
            { name: 'title', label: 'Title', widget: 'string' },
            { name: 'intro', label: 'Intro', widget: 'markdown' },
          ],
        },
      ],
    },
  ],
};

const Admin = () => {
  useEffect(() => {
    (async () => {
      const CMS = (await import('netlify-cms-app')).default;
      // @ts-ignore
      CMS.init({ config });
      // @ts-ignore
      CMS.registerPreviewTemplate('home', HomePagePreview);
    })();
  }, []);

  return null;
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

// backend:
//   name: git-gateway
//   branch: main # Branch to update (optional; defaults to master)

// media_folder: 'public/uploads' # Where media files will be stored
// public_folder: 'public/uploads' # Where the media files can be accesed from the server
// publish_mode: editorial_workflow # For Drafts

// - label: 'Pages'
// name: 'pages'
// files:
//   - label: 'Home Page'
//     name: 'home'
//     file: 'content/pages/home.md'
//     fields:
//       - { label: Title, name: title, widget: string }
//       - { label: Intro, name: intro, widget: markdown }
//       - label: Team
//         name: team
//         widget: list
//         fields:
//           - { label: Name, name: name, widget: string }
//           - { label: Position, name: position, widget: string }
//           - { label: Photo, name: photo, widget: image }
// {
//   name: 'blog',
//   label: 'Blog',
//   folder: 'content/blog',
//   create: true,
//   fields: [
//     { name: 'title', label: 'Title', widget: 'string' },
//     { name: 'description', label: 'Description', widget: 'text' },
//     {
//       name: 'body',
//       label: 'Body',
//       widget: 'markdown',
//     },
//   ],
// },
