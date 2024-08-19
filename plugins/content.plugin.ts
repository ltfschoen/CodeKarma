import { Plugin, Parameters, Rule } from "./interface.ts";

export default class ContainsTextPlugin implements Plugin {
  async execute(rule: Rule, parameters: Parameters, files: string[]): Promise<number> {
    const containsText = rule.args.contains as string;
    for (const file of files) {
      try {
        const content = await Deno.readTextFileSync(file);
        if (content.includes(containsText)) {
          console.info(`File ${file} contains text "${containsText}"`);
          return rule.result == "avoid" ? 0 : 1;
        }
      } catch (error) {
        console.error(`Error while analyzing file ${file}: ${error}`);
      }
    }
    return rule.result == "avoid" ? 1 : 0;
  }
}

