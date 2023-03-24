import { useEffect } from 'react';
import HomePagePreview from '../templates/HomePage';

const config = {
  backend: {
    name: 'git-gateway',
    branch: 'main',
  },
  media_folder: 'public/images',
  public_folder: 'images',

  // media_library: {
  //   name: 'cloudinary',
  //   config: {
  //     cloud_name: 'dmkg8rfly',
  //     api_key: '398367376997286',
  //     default_transformations: {
  //       fetch_format: 'auto',
  //       quality: 'auto',
  //       gravity: 'auto',
  //       crop: 'fill',
  //     },
  //   },
  // },
  // media_folder: 'public/uploads',
  // public_folder: 'uploads',
  publish_mode: 'editorial_workflow',
  collections: [
    {
      label: 'Global settings',
      name: 'global_settings',
      files: [
        {
          label: 'Site',
          name: 'site',
          file: 'content/global_settings/site.md',
          fields: [
            { name: 'seo_title', label: 'SEO Title', widget: 'string' },
            { name: 'seo_description', label: 'SEO Description', widget: 'text' },
            { name: 'site_name', label: 'Site Name', widget: 'text' },
          ],
        },
        {
          label: 'Social Media',
          name: 'social_media',
          file: 'content/global_settings/social_media.md',
          fields: [
            {
              label: 'Social media links',
              name: 'social_media_links',
              widget: 'list',
              fields: [
                { name: 'name', label: 'Name', widget: 'string' },
                { name: 'url', label: 'Url', widget: 'string' },
                { name: 'icon', label: 'Icon Name', widget: 'string' },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Pages',
      name: 'pages',
      files: [
        {
          label: 'Home Page',
          name: 'home',
          file: 'content/pages/home.md',
          fields: [
            { name: 'seo_title', label: 'SEO Title', widget: 'string' },
            { name: 'seo_description', label: 'SEO Description', widget: 'text' },
            { name: 'heading', label: 'Heading', widget: 'string' },
            { name: 'intro', label: 'Intro', widget: 'markdown' },
            { name: 'image', label: 'Image', widget: 'image' },
          ],
        },
      ],
    },
    {
      label: 'Portfolio',
      name: 'portfolio',
      folder: 'content/portfolio',
      create: true,
      fields: [
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'description', label: 'Description', widget: 'markdown' },
        {
          label: 'Images',
          name: 'images',
          widget: 'list',
          fields: [
            { name: 'image', label: 'Image', widget: 'image' },
            { name: 'alt', label: 'Alt Text', widget: 'string' },
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
