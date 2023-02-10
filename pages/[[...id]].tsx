import Head from "next/head";
import dynamic from "next/dynamic";
import { RootComponentInstance } from "@uniformdev/canvas";
import {
  UniformComposition,
  UniformSlot,
  createUniformApiEnhancer,
} from "@uniformdev/canvas-react";
import { resolveRenderer } from "../components";
import { withUniformGetStaticProps } from "@uniformdev/canvas-next/slug";
export { getStaticPaths } from '@uniformdev/canvas-next/slug';

export const getStaticProps = withUniformGetStaticProps(undefined, { param: 'id'});

const PreviewDevPanel = dynamic(
  () => import("lib/preview/PreviewDevPanel/PreviewDevPanel")
);

export default function Home({
  data: composition,
  preview,
}: {
  preview: boolean;
  data: RootComponentInstance;
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
