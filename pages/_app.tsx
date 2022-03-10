import getConfig from "next/config";
import { UniformContext } from "@uniformdev/context-react";
import { UniformAppProps } from "@uniformdev/context-next";
import { createUniformContext } from "../lib/context/uniformContext";
// import { EmbeddedContextDevTools } from "@uniformdev/context-devtools";

import "../styles/style.css";
const {
  serverRuntimeConfig: { uniformApiKey, canvasApiHost, projectId },
  publicRuntimeConfig: { edgeEnabled },
} = getConfig();

const clientContext = createUniformContext();

export default function UniformConfApp({
  Component,
  pageProps,
  serverUniformContext,
}: UniformAppProps) {
  return (
    <UniformContext
      context={serverUniformContext ?? clientContext}
      outputType="edge"
    >
      <Component {...pageProps} />
      {/* <EmbeddedContextDevTools
        initialSettings={{
          apiHost: canvasApiHost,
          apiKey: uniformApiKey,
          projectId: projectId,
        }}
      /> */}
    </UniformContext>
  );
}
