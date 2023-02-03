import Head from "next/head";
import { RootComponentInstance } from "@uniformdev/canvas";
import {
  UniformComposition,
  UniformSlot,
  createUniformApiEnhancer,
} from "@uniformdev/canvas-react";
import { getCompositionBySlug } from "lib/canvasClient";
import { resolveRenderer } from "../components";
import { getToken } from "next-auth/jwt";

export default function Home({
  composition,
}: {
  preview: boolean;
  composition: RootComponentInstance;
}) {
  const contextualEditingEnhancer = createUniformApiEnhancer({
    apiUrl: "/api/preview",
  });
  return (
    <>
      <Head>
        <title>{`UniformConf${
          composition?._name ? ` | ${composition?._name}` : ""
        }`}</title>
        <meta name="description" content="UniformConf"></meta>
      </Head>
      <div>
        <UniformComposition
          data={composition}
          resolveRenderer={resolveRenderer}
          contextualEditingEnhancer={contextualEditingEnhancer}
        >
          <UniformSlot name="header" />
          <UniformSlot name="content" />
          <UniformSlot name="footer" />
        </UniformComposition>
      </div>
    </>
  );
}

export async function getServerSideProps({ context, req, res }: any) {
  const slug = context?.params?.id;
  const { preview } = context;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const slashedSlug = !slugString
    ? "/"
    : slugString.startsWith("/")
    ? slugString
    : `/${slugString}`;

  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  const composition = await getCompositionBySlug(
    slashedSlug,
    Boolean(preview),
    token
  );

  return {
    props: {
      composition,
      preview: Boolean(preview),
    },
  };
}
