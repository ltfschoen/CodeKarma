import { parseArgs, parse } from "./dependencies.ts";
import { parseCommandLine } from "./util.ts";

export class Rule {
  readonly definition: string;
  readonly result: string;
  readonly name: string;
  readonly args: ReturnType<typeof parseArgs>;

  constructor(definition: string) {
    const argList = parseCommandLine(definition)
    const args = parseArgs(argList);
    if (args._.length < 2) {
      throw new Error("Rule must have at least two arguments, example: 'avoid content --contains=google'");
    }
    this.definition = definition;
    this.result = args._[0] as string;
    this.name = args._[1] as string;
    args._ = args._.slice(2) as string[];
    this.args = args;
  }
}

export class Manifest {
  private _rules: Rule[] = [];

  get rules() {
    return this._rules;
  }

  constructor(private text: string) {
    this._rules = text.split("\n")
      .filter(line => line.trim() !== "" && !line.trim().startsWith("#"))
      .map(line => new Rule(line));
  }

  static load(path: string) {
    const text = Deno.readTextFileSync(path);
    return new Manifest(text);
  }
}

