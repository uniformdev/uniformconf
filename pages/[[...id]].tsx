import { withUniformGetStaticProps } from "@uniformdev/canvas-next/slug";
export { getStaticPaths } from "@uniformdev/canvas-next/slug";
import MainContainer from "@/components/MainContainer";

export const getStaticProps = withUniformGetStaticProps({ param: "id" });

export default MainContainer;
