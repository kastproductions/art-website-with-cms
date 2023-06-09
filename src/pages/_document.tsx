import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { theme } from './_app';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Netlify Widget */}
          {/* <script async src="https://identity.netlify.com/v1/netlify-identity-widget.js" /> */}
          {/* <script>window.CMS_MANUAL_INIT=true</script> */}
        </Head>
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: `window.CMS_MANUAL_INIT = true` }} />
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on("init", user => {
                  if (!user) {
                    window.netlifyIdentity.on("login", () => {
                      document.location.href = "/admin/";
                    });
                  }
                });
              }
          `,
            }}
          /> */}
        </body>
      </Html>
    );
  }
}
