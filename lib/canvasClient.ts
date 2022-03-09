import { CanvasClient } from "@uniformdev/canvas";
import getConfig from "next/config";

const {
  serverRuntimeConfig: {
    uniformApiKey,
    canvasApiHost,
    projectId,
  },
} = getConfig();

export const canvasClient = new CanvasClient({
  apiKey: uniformApiKey,
  apiHost: canvasApiHost,
  projectId: projectId,
});
