import { GetStaticPropsContext } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { RootComponentInstance } from "@uniformdev/canvas";
import {
  UniformComposition,
  UniformSlot,
  createUniformApiEnhancer,
} from "@uniformdev/canvas-react";
import { getCompositionBySlug, getCompositionPaths } from "lib/canvasClient";
import { resolveRenderer } from "../components";

const PreviewDevPanel = dynamic(
  () => import("lib/preview/PreviewDevPanel/PreviewDevPanel")
);

export default function Home({
  composition,
  preview,
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
        {preview && (
          <PreviewDevPanel preview={preview} composition={composition} />
        )}
      </div>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context?.params?.id;
  const { preview } = context;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const slashedSlug = !slugString
    ? "/"
    : slugString.startsWith("/")
    ? slugString
    : `/${slugString}`;

  const composition = await getCompositionBySlug(slashedSlug, Boolean(preview));

  return {
    props: {
      composition,
      preview: Boolean(preview),
    },
  };
}

export async function getStaticPaths() {
  const paths = await getCompositionPaths();
  return { paths, fallback: true };
}
