import { useEffect } from 'react';
import { HomePagePreview } from '../../templates/HomePage';
import { AboutPagePreview } from '../../templates/AboutPage';
import { ArtPagePreview } from '@/components/templates/pages/art';
import { CollectionPagePreview } from '@/components/templates/pages/collection';

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
const config = {
  backend: {
    name: 'git-gateway',
    branch: 'main',
  },
  local_backend: true,
  media_folder: 'public/images',
  public_folder: 'images',

  publish_mode: 'editorial_workflow',
  collections: [
    {
      label: 'Site Settings',
      name: 'site_settings',
      delete: false,
      files: [
        {
          label: 'SEO',
          name: 'seo',
          file: 'content/site_settings/seo.md',
          fields: [
            { name: 'title', label: 'SEO Title', widget: 'string' },
            { name: 'description', label: 'SEO Description', widget: 'text' },
            { name: 'name', label: 'Site Name', widget: 'text' },
          ],
        },
        {
          label: 'Social media links',
          name: 'social_media_links',
          file: 'content/site_settings/social_media_links.md',
          fields: [
            {
              label: 'Social media links',
              name: 'social_media_links',
              widget: 'list',
              collapsed: false,
              create: true,
              delete: true,
              fields: [
                { name: 'name', label: 'Name', widget: 'string' },
                { name: 'url', label: 'Url', widget: 'string' },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Page',
      name: 'page',
      delete: false,
      files: [
        {
          label: 'Home',
          name: 'home',
          file: 'content/pages/home.md',
          fields: [
            { name: 'seo_title', label: 'SEO Title', widget: 'string' },
            { name: 'seo_description', label: 'SEO Description', widget: 'text' },
            { name: 'heading', label: 'Heading', widget: 'string' },
            { name: 'intro', label: 'Intro', widget: 'markdown' },
            { name: 'image', label: 'Image', widget: 'image' },
            { name: 'quote', label: 'Quote', widget: 'text' },
          ],
        },
        {
          label: 'About',
          name: 'about',
          file: 'content/pages/about.md',
          fields: [{ name: 'body', label: 'Body', widget: 'markdown' }],
        },
      ],
    },
    {
      label: 'Collection',
      name: 'collection',
      folder: 'content/collection',
      create: true,
      delete: true,
      fields: [
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'description', label: 'Description', widget: 'markdown' },
        {
          label: 'Portfolio items in this collection',
          name: 'portfolio_items',
          widget: 'list',
          collapsed: false,
          fields: [
            {
              name: 'item',
              label: 'Item',
              widget: 'relation',
              collection: 'portfolio',
              search_fields: ['title'],
              value_field: '{{title}}',
              display_fields: ['{{title}}'],
            },
          ],
        },
      ],
    },
    {
      label: 'Portfolio',
      name: 'portfolio',
      folder: 'content/portfolio',
      create: true,
      delete: true,
      fields: [
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'description', label: 'Description', widget: 'markdown' },
        {
          label: 'Images',
          name: 'images',
          widget: 'list',
          default: [],
          fields: [
            { name: 'image', label: 'Image', widget: 'image' },
            { name: 'alt', label: 'Alt Text', widget: 'string' },
          ],
        },
        {
          label: 'Tags',
          name: 'tags',
          widget: 'relation',
          collection: 'tags',
          search_fields: ['name'],
          value_field: 'name',
          display_fields: ['name'],
          multiple: true,
          required: false,
        },
      ],
    },

    {
      name: 'tags',
      label: 'Tags',
      files: [
        {
          file: 'content/tags.md',
          label: 'Tags List',
          name: 'tags',
          fields: [
            {
              label: 'Tags',
              name: 'tags',
              widget: 'list',
              fields: [{ label: 'Name', name: 'name', widget: 'string' }],
            },
          ],
        },
      ],
    },
    // {
    //   name: 'tags',
    //   label: 'Tags',
    //   files: [
    //     {
    //       name: 'tags',
    //       label: 'Tags',
    //       file: 'content/tags.md',
    //       fields: [
    //         {
    //           name: 'tags',
    //           label: 'Tags',
    //           widget: 'list',
    //           default: [],
    //           collapsed: false,
    //           create: true,
    //           delete: true,
    //           field: {
    //             name: 'name',
    //             label: 'Tag',
    //             widget: 'string',
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
};

// {
//   label: 'Belongs to collection',
//   name: 'collection',
//   widget: 'relation',
//   collection: 'collection',
//   searchFields: ['title'],
//   valueField: 'title',
//   displayFields: ['title'],
//   multiple: true,
// },

const Admin = () => {
  useEffect(() => {
    (async () => {
      const CMS = (await import('netlify-cms-app')).default;
      // @ts-ignore
      CMS.init({ config });
      CMS.registerEventListener({
        name: 'preSave',
        handler: ({ entry }) => {
          const entrydata = entry.get('data');
          console.log({ entrydata });
          // const data= entry.get('data').set('title', 'new title');
        },
      });

      CMS.registerPreviewTemplate('collection', CollectionPagePreview);
      CMS.registerPreviewTemplate('portfolio', ArtPagePreview);
      CMS.registerPreviewTemplate('home', HomePagePreview);
      CMS.registerPreviewTemplate('about', AboutPagePreview);
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
