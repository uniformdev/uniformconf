import { UniformContext } from "@uniformdev/context-react";
import { UniformAppProps } from "@uniformdev/context-next";
import { createUniformContext } from "../lib/context/uniformContext";
import "../components/canvas-components";
import "../styles/style.css";

const clientContext = createUniformContext();

export default function UniformConfApp({
  Component,
  pageProps,
}: UniformAppProps) {
  return (
    <UniformContext
      context={clientContext}
      outputType={process.env.NODE_ENV === "development" ? "standard" : "edge"}
    >
      <Component {...pageProps} />
    </UniformContext>
  );
}
