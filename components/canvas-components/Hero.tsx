import Link from "next/link";
import {
  registerUniformComponent,
  ComponentProps,
  UniformText,
} from "@uniformdev/canvas-react";
import Splitter from "../atoms/Splitter";

const highlightUniform = (value = "") => (
  <span
    dangerouslySetInnerHTML={{
      __html: value.replace(
        "Uniform",
        '<span class="highlighted">Uniform</span>'
      ),
    }}
  />
);

type HeroProps = ComponentProps<{
  title: string;
  text: string;
  buttonText: string;
  buttonLink: string;
  image?: string;
}>;

export function Hero({
  title,
  text,
  buttonText,
  image,
  buttonLink,
}: HeroProps) {
  return (
    <>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left min-h-500">
            <p className="uppercase tracking-loose w-full">
              This is Uniform demo
            </p>
            <UniformText
              as="h1"
              parameterId="title"
              className="my-4 text-5xl font-bold leading-tight"
              render={highlightUniform}
            />
            <UniformText
              as="p"
              parameterId="text"
              isMultiline
              className="leading-normal text-2xl mb-8"
            />

            {buttonText ? (
              <Link prefetch={false} href={buttonLink ? buttonLink : "#"}>
                <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                  <UniformText parameterId="buttonText" />
                </button>
              </Link>
            ) : null}
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            {image && (
              <img
                className="w-full md:w-4/5 z-50 min-h-500 max-h-500"
                height={500}
                src={image}
                alt={buttonText}
              />
            )}
          </div>
        </div>
      </div>
      <Splitter />
    </>
  );
}

registerUniformComponent({
  type: "hero",
  component: Hero,
});
