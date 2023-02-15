import React from "react";
import Link from "next/link";
import { registerUniformComponent } from "@uniformdev/canvas-react";
import { ToggleEmbeddedContextDevTools } from "@uniformdev/context-devtools";
import getConfig from "next/config";

import Logo from "../atoms/Logo";

const { serverRuntimeConfig } = getConfig();
const { projectId, apiKey, apiHost } = serverRuntimeConfig;

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto px-8">
        <div className="w-full flex flex-col md:flex-row py-4">
          <div className="flex-1 mb-6">
            <Link
              prefetch={false}
              href="/"
              aria-label="Uniform"
              className="text-orange-600 no-underline hover:no-underline"
            >
              <Logo />
            </Link>
          </div>
          <p className="text-gray-900 text-right flex-1 leading-8">
            Uniform starter kit for Next.js © {new Date().getFullYear()}
          </p>
        </div>
      </div>
      <ToggleEmbeddedContextDevTools
        initialSettings={{
          apiHost: apiHost,
          apiKey: apiKey,
          projectId: projectId,
        }}
      />
    </footer>
  );
};

registerUniformComponent({
  type: "footer",
  component: Footer,
});

export default Footer;
