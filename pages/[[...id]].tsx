import {
  withUniformGetStaticProps,
  withUniformGetStaticPaths,
} from "@uniformdev/canvas-next/slug";
import MainContainer from "@/components/MainContainer";
import runEnhancers from "@/lib/enhancers";

export const getStaticProps = withUniformGetStaticProps({
  param: "id",
  preview: process.env.NODE_ENV === "development",
  callback: async (context, composition) => {
    if (composition) {
      await runEnhancers(composition, context);
    } else {
      return {
        notFound: true,
      };
    }
    return {
      // Enhanced composition data will be injected later, so no need to do it yourself
      props: {},
      // Specifying some NextJS ISG params per page.
      // revalidate: 100,
    };
  },
});

export const getStaticPaths = withUniformGetStaticPaths({
  preview: process.env.NODE_ENV === "development",
});

export default MainContainer;

// ===========================================================================
// Low- level implementation of getStaticProps without the canvas-next helpers
// ===========================================================================
// const getStaticProps = async (context: GetStaticPropsContext) => {
//   const canvasClient = new CanvasClient({
//     apiKey: process.env.UNIFORM_API_KEY,
//     apiHost: process.env.UNIFORM_CLI_BASE_URL,
//     projectId: process.env.UNIFORM_PROJECT_ID,
//   });
//
//   const slug = context?.params?.id;
//   const { preview } = context;
//   const slugString = Array.isArray(slug) ? slug.join("/") : slug;
//   const slashedSlug = !slugString
//     ? "/"
//     : slugString.startsWith("/")
//       ? slugString
//       : `/${slugString}`;
//
//   const { composition } = await canvasClient.getCompositionBySlug({
//     slug,
//     state: process.env.NODE_ENV === "development"
//       ? CANVAS_DRAFT_STATE
//       : CANVAS_PUBLISHED_STATE,
//   });
//
//   return {
//     props: {
//       composition,
//       preview: Boolean(preview),
//     },
//   };
// }


// ===========================================================================
// Low- level implementation of getStaticPaths without the canvas-next helpers
// ===========================================================================
// const getStaticPaths = async () => {
//   const canvasClient = new CanvasClient({
//     apiKey: process.env.UNIFORM_API_KEY,
//     apiHost: process.env.UNIFORM_CLI_BASE_URL,
//     projectId: process.env.UNIFORM_PROJECT_ID,
//   });
//
//   const pages = await canvasClient.getCompositionList({
//     skipEnhance: true,
//     state: process.env.NODE_ENV === "development"
//       ? CANVAS_DRAFT_STATE
//       : CANVAS_PUBLISHED_STATE,
//   });
//
//   const paths = pages.compositions
//     .filter((c) => c.composition._slug)
//     .map((c) =>
//       c.composition._slug?.startsWith("/")
//         ? `${c.composition._slug}`
//         : `/${c.composition._slug}`
//     );
//   return { paths, fallback: true };
// }
