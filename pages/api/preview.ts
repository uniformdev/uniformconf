import { GetStaticPropsContext } from "next";
import { createPreviewHandler } from "@uniformdev/canvas-next";
import runEnhancers from "@/lib/enhancers";

const context: GetStaticPropsContext = {
  preview: true,
};

const handler = createPreviewHandler({
  secret: () => process.env.UNIFORM_PREVIEW_SECRET || 'uniformconf',
  enhance: (composition) => runEnhancers(composition, context),
});

export default handler;
