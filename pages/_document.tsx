/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* <!-- Google Tag Manager --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WF8BHPZ');`,
            }}
          />
          {/* <!-- End Google Tag Manager --> */}

          <title>CashBoat</title>

          {/* <!-- Google / Search Engine Tags --> */}
          <meta itemProp="name" content="CashBoat" />
          <meta itemProp="description" content="Offshore USD to ARS" />
          <meta itemProp="image" content="https://cashboat.vercel.app/cashboat.jpg" />

          {/* !-- Facebook Meta Tags --> */}
          <meta property="og:url" content="https://cashboat.vercel.app" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="CashBoat" />
          <meta property="og:description" content="Offshore USD to ARS" />
          <meta property="og:image" content="https://cashboat.vercel.app/cashboat.jpg" />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="CashBoat" />
          <meta name="twitter:description" content="Offshore USD to ARS" />
          <meta name="twitter:image" content="https://cashboat.vercel.app/cashboat.jpg" />

          {/* <!-- Meta Tags Generated via http://heymeta.com --> */}
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WF8BHPZ"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
