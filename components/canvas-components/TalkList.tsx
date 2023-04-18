import React from "react";
import {
  registerUniformComponent,
  ComponentProps,
  UniformSlot,
  UniformText,
} from "@uniformdev/canvas-react";

export type TalkListProps = ComponentProps<{
  title: string;
}>;

function TalkList({}: TalkListProps) {
  return (
    <fieldset>
      <section className="bg-white border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <UniformText
            as="h1"
            parameterId="title"
            className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
          />
          <UniformSlot name="talks">
            {({ child, key }) => (
              <div
                key={key}
                className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink"
              >
                {child}
              </div>
            )}
          </UniformSlot>
        </div>
      </section>
    </fieldset>
  );
}

registerUniformComponent({
  type: "talklist",
  component: TalkList,
});

export default TalkList;
