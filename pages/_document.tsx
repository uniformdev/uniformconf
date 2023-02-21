import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  let tagManagerSrc = "";
  const gaTrackingId = process.env.NEXT_PUBLIC_GA4_ID;
  if (gaTrackingId) {
    tagManagerSrc = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`;
  }
  return (
    <Html lang="en">
      <Head>
        <link href="/favicon/favicon.ico" rel="icon" />
        <link href="/favicon/apple-touch-icon.png" rel="apple-touch-icon" />
        <meta
          name="description"
          content="UniformConf, a Uniform content demo site"
        />
      </Head>
      {tagManagerSrc && (
        <>
          <script async src={tagManagerSrc}></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaTrackingId}', {
                page_path: window.location.pathname,
              });
              `,
            }}
          />
        </>
      )}
      <body className="leading-normal tracking-normal text-white gradient">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
