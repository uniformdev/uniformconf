import { CanvasClient } from "@uniformdev/canvas";
import getConfig from "next/config";

const {
  serverRuntimeConfig: {
    apiKey,
    canvasApiHost,
    projectId,
  },
} = getConfig();

export const canvasClient = new CanvasClient({
  apiKey: apiKey,
  apiHost: canvasApiHost,
  projectId: projectId,
});
