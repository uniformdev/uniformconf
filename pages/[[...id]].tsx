import { GetStaticPropsContext } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { RootComponentInstance } from "@uniformdev/canvas";
import {
  Composition,
  Slot,
  useContextualEditing,
  createApiEnhancer,
} from "@uniformdev/canvas-react";
import { getCompositionBySlug, getCompositionPaths } from "lib/canvasClient";
import { resolveRenderer } from "../components";

const PreviewDevPanel = dynamic(
  () => import("lib/preview/PreviewDevPanel/PreviewDevPanel")
);

export default function Home({
  composition: initialCompositionValue,
  preview,
}: {
  preview: boolean;
  composition: RootComponentInstance;
}) {
  const { composition } = useContextualEditing({
    initialCompositionValue,
    enhance: createApiEnhancer({
      apiUrl: "/api/preview",
    }),
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
        <Composition data={composition} resolveRenderer={resolveRenderer}>
          <Slot name="header" />
          <Slot name="content" />
          <Slot name="footer" />
        </Composition>
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
