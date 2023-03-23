import { useEffect } from 'react';
import { HomePagePreview } from '../templates/HomePage';
import dynamic from 'next/dynamic';
// @ts-ignore
const CMS = dynamic(() => import('netlify-cms-app').default, { ssr: false });

const Admin = () => {
  useEffect(() => {
    if (!CMS) return;
    // @ts-ignore
    CMS.init();
    // @ts-ignore
    CMS.registerPreviewTemplate('home', HomePagePreview);
  }, []);

  return <div id="nc-root" />;
};

export default Admin;
