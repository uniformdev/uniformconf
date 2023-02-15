import { enhance, EnhancerBuilder } from "@uniformdev/canvas";

// TODO: to enable contentful enhancers:
// import { CANVAS_CONTENTFUL_PARAMETER_TYPES } from "@uniformdev/canvas-contentful";
// import getContentfulEnhancer from "./contentful";

export default async function runEnhancers(
  composition: any,
  context: { preview: boolean }
) {
  const { preview } = context || {};
  //TODO: register your CMS specific enhancers here
  // see docs: https://docs.uniform.app/canvas/tutorials/enhancers
  //   await enhance({
  //     composition,
  //     enhancers: new EnhancerBuilder().parameterType(
  //       CANVAS_CONTENTFUL_PARAMETER_TYPES,
  //       getContentfulEnhancer(preview)
  //     ),
  //     context,
  //   });
  return composition;
}
