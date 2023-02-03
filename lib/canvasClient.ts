import {
  CanvasClient,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
} from "@uniformdev/canvas";
import runEnhancers from "./enhancers";
import getConfig from "next/config";

const {
  serverRuntimeConfig: { apiKey, apiHost, projectId },
} = getConfig();

export const getState = (preview: boolean | undefined) =>
  process.env.NODE_ENV === "development" || preview
    ? CANVAS_DRAFT_STATE
    : CANVAS_PUBLISHED_STATE;

export const canvasClient = new CanvasClient({
  apiKey,
  apiHost,
  projectId,
});

export async function getCompositionBySlug(
  slug: string,
  preview: boolean,
  token: any
) {
  const { composition } = await canvasClient.getCompositionBySlug({
    slug,
    state: getState(preview),
  });
  await runEnhancers(composition, token);
  return composition;
}

export const getCompositionPaths = async () => {
  const pages = await canvasClient.getCompositionList({
    skipEnhance: true,
    state: getState(undefined),
  });

  return pages.compositions
    .filter((c) => c.composition._slug)
    .map((c) =>
      c.composition._slug?.startsWith("/")
        ? `${c.composition._slug}`
        : `/${c.composition._slug}`
    );
};
