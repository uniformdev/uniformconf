import React from "react";
import {
  registerUniformComponent,
  ComponentProps,
  UniformText,
} from "@uniformdev/canvas-react";

export const WhyAttendLoading = () => {
  return (
    <div
      className="container mx-auto flex flex-wrap pt-4 pb-12"
      style={{ minHeight: 515 }}
    ></div>
  );
};

export type WhyAttendProps = ComponentProps<{
  title: string;
  text: string;
  image: string;
}>;

export const WhyAttend = ({ image, component }: WhyAttendProps) => (
  <section className="bg-white border-b py-8">
    <div
      className="container mx-auto flex flex-wrap pt-4 pb-12"
      style={{
        flexDirection:
          component.variant === "whyattendleft" ? "row" : "row-reverse",
      }}
    >
      {image ? (
        <div className="w-1/2">
          <img
            src={image}
            alt="Conference audience"
            width={400}
            height={400}
            loading="lazy"
            className="p-10"
          />
        </div>
      ) : null}
      <div className="w-1/2">
        <div className="p-10">
          <UniformText
            as="h2"
            parameterId="title"
            className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800"
          />
          <hr />
          <UniformText
            as="p"
            parameterId="text"
            isMultiline
            className="text-gray-800 p-10 whitespace-pre-line"
          />
        </div>
      </div>
    </div>
  </section>
);

registerUniformComponent({
  type: "whyattend",
  variantId: "whyattendleft",
  component: WhyAttend,
});

registerUniformComponent({
  type: "whyattend",
  variantId: "whyattendright",
  component: WhyAttend,
});
