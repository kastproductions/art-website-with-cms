import { useEffect } from 'react';
import HomePageTemplate from '../templates/HomePage';

const Admin = () => {
  useEffect(() => {
    (async () => {
      const CMS = (await import('netlify-cms-app')).default;
      CMS.init();
      CMS.registerPreviewTemplate('home', HomePageTemplate);
    })();
  }, []);

  return <div />;
};

export default Admin;
