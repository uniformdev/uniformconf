import { useRef } from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import {
  RootComponentInstance,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
} from "@uniformdev/canvas";

import { Composition, Slot } from "@uniformdev/canvas-react";
import { canvasClient } from "lib/canvasClient";
import { resolveRenderer } from "../components";

export default function Home({
  composition,
}: {
  preview: boolean;
  composition: RootComponentInstance;
}) {
  const containerRef = useRef(null);
  return (
    <>
      <Head>
        <title>Uniform Conf</title>
        <meta name="description" content="Uniform conf"></meta>
      </Head>
      <div ref={containerRef}>
        <Composition data={composition} resolveRenderer={resolveRenderer}>
          <Slot name="header" />
          <Slot name="content" />
          <Slot name="footer" />
        </Composition>
      </div>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context?.params?.id;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const { preview } = context;
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: slugString ? `/${slugString}` : "/",
    state:
      process.env.NODE_ENV === "development"
        ? CANVAS_DRAFT_STATE
        : CANVAS_PUBLISHED_STATE,
  });

  return {
    props: {
      composition,
      preview: Boolean(preview),
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await canvasClient.getCompositionList({
    state:
      process.env.NODE_ENV === "development"
        ? CANVAS_DRAFT_STATE
        : CANVAS_PUBLISHED_STATE,
  });

  return {
    paths: pages.compositions
      .map((c) => c.composition._slug!)
      .filter((slug) => slug),
    fallback: false,
  };
};
