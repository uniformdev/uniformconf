import PreviewSwitch from "./PreviewSwitch/PreviewSwitch";
import { RootComponentInstance } from "@uniformdev/canvas";

function PreviewEnabler({
  preview,
}: {
  preview?: boolean;
  composition: RootComponentInstance;
}) {
  return preview ? <PreviewSwitch previewing={preview} /> : null;
}

export default PreviewEnabler;
