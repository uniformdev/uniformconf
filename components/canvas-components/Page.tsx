import {
  registerUniformComponent,
  ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-react";

type PageProps = ComponentProps<{}>;

export function Page({}: PageProps) {
  return (
    <>
      <UniformSlot name="header" />
      <UniformSlot name="content" />
      <UniformSlot name="footer" />
    </>
  );
}

registerUniformComponent({
  type: "page",
  component: Page,
});
