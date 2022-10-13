import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
  RootComponentInstance,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
} from "@uniformdev/canvas";
import { Composition, Slot } from "@uniformdev/canvas-react";
import { canvasClient } from "lib/canvasClient";
import { resolveRenderer } from "../components";
import { projectMapClient } from "../lib/projectMapClient";
import getConfig from "next/config";

const PreviewDevPanel = dynamic(
  () => import("lib/preview/PreviewDevPanel/PreviewDevPanel")
);

const {
  serverRuntimeConfig: {
    projectId,
    projectMapId,
  },
} = getConfig();

export default function Home({
  composition,
  preview,
}: {
  preview: boolean;
  composition: RootComponentInstance;
}) {
  return (
    <>
      <Head>
        <title>{`UniformConf${composition?._name ? ` | ${composition?._name}` : ''}`}</title>
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
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  const { preview } = context;

  const { composition } = await canvasClient.unstable_getCompositionByNodePath({
    projectMapId,
    projectMapNodePath: slugString ? `/${slugString}` : '/',
    state:
      process.env.NODE_ENV === "development" || preview
        ? CANVAS_DRAFT_STATE
        : CANVAS_PUBLISHED_STATE,
  });

  if (!composition) {
    return { notFound: true };
  }

  return {
    props: {
      composition,
      preview: Boolean(preview),
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { nodes } = await projectMapClient.getNodes({
    projectId,
    projectMapId,
  });

  return {
    paths: nodes?.filter((node) => node.compositionId!).map((node) => node.path) ?? [],
    fallback: false,
  };
};
