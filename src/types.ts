import { Rule } from "./manifest.ts";

export type Parameters = {
  manifest: string;
  project: string;
  ignore?: string[];
  include?: string[];
  verbose?: boolean;
  recursive?: boolean;
  watch?: boolean;
  _: string[],
};

export interface Plugin {
  execute: (rule: Rule, parameters: Parameters, files: string[]) => Promise<number>;
  init?: () => void;
}

export type Plugins = Map<string, Plugin>;

