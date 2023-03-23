import React from 'react';
import CMS from 'netlify-cms-app';
import HomePage from '../src/templates/HomePage';

const HomePagePreview = ({ entry, widgetFor }) => {
  const data = {
    title: entry.getIn(['data', 'title']),
    intro: entry.getIn(['data', 'intro']),
  };

  return <HomePage {...data} />;
};

CMS.registerPreviewTemplate('blog', HomePagePreview);
