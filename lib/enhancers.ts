// import { enhance, EnhancerBuilder, compose } from "@uniformdev/canvas";

// import {
//   createCloudinaryEnhancer,
//   CLOUDINARY_PARAMETER_TYPES,
// } from "@uniformdev/canvas-cloudinary";
// import { cloudinaryModelConverter } from "./converters/cloudinaryModelConverter";

export default async function runEnhancers(composition: any) {
  //const enhancers = new EnhancerBuilder();
  // TODO: register your CMS specific enhancers here
  // see docs: https://docs.uniform.app/canvas/tutorials/enhancers
  // await enhance({
  //   composition,
  //   enhancers: new EnhancerBuilder().parameterType(
  //     CLOUDINARY_PARAMETER_TYPES,
  //     compose(createCloudinaryEnhancer(), cloudinaryModelConverter)
  //   ),
  //   context: {},
  // });

  return composition;
}
