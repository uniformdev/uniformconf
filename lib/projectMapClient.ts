import { ProjectMapClient } from '@uniformdev/project-map';
import getConfig from "next/config";

const {
  serverRuntimeConfig: {
    apiKey,
    apiHost,
  },
} = getConfig();

export const projectMapClient = new ProjectMapClient({
  apiKey,
  apiHost,
});
