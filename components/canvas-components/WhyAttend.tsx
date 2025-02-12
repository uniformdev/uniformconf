import React from "react";
import {
  registerUniformComponent,
  ComponentProps,
  UniformText,
} from "@uniformdev/canvas-react";
import { AssetParamValue, flattenValues } from "@uniformdev/canvas";

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
  image: AssetParamValue;
}>;

export const WhyAttend = ({
  title,
  text,
  image,
  component,
}: WhyAttendProps) => {
  const imageUrl = flattenValues(image, { toSingle: true })?.url;
  return (
    <section className="bg-white border-b py-8">
      <div
        className="container mx-auto flex flex-wrap pt-4 pb-12"
        style={{
          flexDirection:
            component.variant === "whyattendleft" ? "row" : "row-reverse",
        }}
      >
        {imageUrl ? (
          <div className="w-1/2">
            <img
              src={imageUrl}
              alt={title}
              width={1000}
              height={1000}
              loading="lazy"
              className="p-10"
            />
          </div>
        ) : null}
        <div className="w-1/2">
          <div className="p-10">
            <UniformText
              parameterId="title"
              placeholder="title goes here"
              as="h2"
              className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800"
            />
            <UniformText
              placeholder="text goes here"
              parameterId="text"
              as="p"
              className="text-gray-800 p-10 whitespace-pre-line"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "whyattend",
  variantId: "",
  component: WhyAttend,
});

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
