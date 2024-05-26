import { existsSync } from "https://deno.land/std/fs/mod.ts";
import { parseArgs, join } from "./dependencies.ts";
import { defaultParameters, root } from "./const.ts";
import config from "../config.json" with { type: "json" };
import { Parameters, Plugins } from "./types.ts";
import { Manifest } from "./manifest.ts";
import { listRecursively } from "./util.ts";

// Define your CLI logic
async function main(args: string[]): Promise<void> {
  const parsedArgs = parseArgs(args);
  const parameters = {
    ...defaultParameters,
    ...parsedArgs,
  }
  console.log("raw args, final", parsedArgs, parameters);

  const plugins = await loadPlugins(join(root, config.plugin.folder), config.plugin.suffix);
  const manifest = Manifest.load(join(root, parameters.manifest));
  const files = await listRecursively(root);
  run(parameters, manifest, plugins, files);

}

if (import.meta.main) {
  main(Deno.args);
}

function run(parameters: Parameters, manifest: Manifest, plugins: Plugins, files: string[]) {
  for (const rule of manifest.rules) {
    const plugin = plugins.get(rule.name);
    console.log('run', rule.name, plugin, plugin?.execute);
    if (!plugin) {
      console.error(`Plugin ${rule.name} does not exist! Rule will be ignored.`, rule);
      continue;
    }
    plugin.execute(rule, parameters, files);
  }
}

async function loadPlugins(folder: string, suffix: string): Promise<Plugins> {
  console.log("loadPlugins", folder, suffix);
  if (!existsSync(folder)) {
    throw new Error(`Plugins directory does not exist: ${folder}`);
  }

  const plugins: Plugins = new Map();
  for await (const dirEntry of Deno.readDir(folder)) {
    if (dirEntry.isFile && dirEntry.name.endsWith(suffix)) {
      const name = dirEntry.name.replace(suffix, '');
      const path = join(folder, dirEntry.name);
      console.log("loadPlugins", name, path);
      const { default: pluginClass } = await import(path);
      const plugin = new pluginClass();
      if (plugin) {
        if (typeof plugin.execute !== 'function') {
          console.error(`Plugin ${name} does not have an execute function!`);
        }

        if (typeof plugin.init === 'function') {
          plugin.init();
        }
        plugins.set(name, plugin);
        console.log(`Loaded plugin ${name} from ${path}`);
      } else {
        console.error(`Failed to load plugin ${name} from ${path}`);
      }
    }
  }
  return plugins;
}
