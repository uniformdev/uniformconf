import { withUniformGetStaticProps, withUniformGetStaticPaths } from "@uniformdev/canvas-next/slug";
import MainContainer from "@/components/MainContainer";

export default MainContainer;

export const getStaticProps = withUniformGetStaticProps({ param: "id" });

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


export const getStaticPaths = withUniformGetStaticPaths();

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