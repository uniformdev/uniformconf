import getConfig from "next/config";
import { createPreviewHandler } from "@uniformdev/canvas-next";

const handler = createPreviewHandler({
  secret: () => getConfig().serverRuntimeConfig.previewSecret,
});

export default handler;
