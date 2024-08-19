import { Parameters } from "./types.ts";

export const defaultParameters: Parameters = {
  manifest: "codekarma.manifest",
  project: "./",
  // ignore: [],
  // include: [],
  // verbose: false,
  // recursive: false,
  // watch: false,
  _: [],
}

export const root = Deno.cwd();


// export const pluginConfig = {
//   folder: "../plugins",
//   suffix: ".plugin.ts",
// }

