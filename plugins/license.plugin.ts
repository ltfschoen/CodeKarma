import { Plugin, Parameters, Rule } from "./interface.ts";

export default class ContainsLicensePlugin implements Plugin {
  async execute(rule: Rule, parameters: Parameters, files: string[]): Promise<number> {
    const containsLicense = rule.args.contains as string;
    for (const file of files) {
      try {
        const content = await Deno.readTextFileSync(file);
        if (content.includes(containsLicense)) {
          console.info(`File ${file} contains license "${containsLicense}"`);
          return 1;
        }
      } catch (error) {
        console.error(`Error while analyzing file ${file}: ${error}`);
      }
    }
    return 0;
  }
}

