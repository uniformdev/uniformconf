import MainContainer from "@/components/MainContainer";
import {
  withUniformGetStaticProps,
  withUniformGetStaticPaths,
} from "@uniformdev/canvas-next/route";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";

export const getStaticProps = withUniformGetStaticProps({
  // fetching draft composition in dev mode for convenience
  requestOptions: {
    state:
      process.env.NODE_ENV === "development"
        ? CANVAS_DRAFT_STATE
        : CANVAS_PUBLISHED_STATE,
  },
  param: "slug",
});

export const getStaticPaths = withUniformGetStaticPaths();

export default MainContainer;
