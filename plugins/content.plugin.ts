import { Plugin, Parameters, Rule } from "./interface.ts";

export default class ContainsTextPlugin implements Plugin {
  async execute(rule: Rule, parameters: Parameters, files: string[]): Promise<number> {
    const containsText = rule.args._[0] as string;
    for (const file of files) {
      try {
        const content = await Deno.readTextFileSync(file);
        if (content.includes(containsText)) {
          console.log(`File ${file} contains text "${containsText}"`);
          return 1;
        }
      } catch (error) {
        console.error(`Error while analyzing file ${file}: ${error}`);
      }
    }
    return 0;
  }
}

