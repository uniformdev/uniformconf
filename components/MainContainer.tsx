import React from "react";
import Head from "next/head";
import { RootComponentInstance } from "@uniformdev/canvas";
import { UniformComposition, ComponentProps } from "@uniformdev/canvas-react";

import { UniformDeployedPreviewBanner } from "@/components/atoms/UniformDeployedPreviewBanner";

import "./canvas-components";

type MainContainerProps = ComponentProps<{
  preview: boolean;
  data: RootComponentInstance;
}>;

export default function MainContainer({
  data: composition,
  preview,
}: MainContainerProps) {
  console.log("composition", composition);
  return (
    <>
      <Head>
        <title>UniformConf</title>
        <meta name="description" content="UniformConf" />
      </Head>
      <div>
        <UniformDeployedPreviewBanner />
        <UniformComposition data={composition} />
      </div>
    </>
  );
}
