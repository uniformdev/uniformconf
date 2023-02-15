import getConfig from "next/config";
import { createPreviewHandler } from "@uniformdev/canvas-next";
import runEnhancers from "lib/enhancers/enhancers";

const context = {
  preview: true,
};

const handler = createPreviewHandler({
  secret: () => getConfig().serverRuntimeConfig.previewSecret,
  enhance: (composition) => runEnhancers(composition, context),
});

export default handler;
