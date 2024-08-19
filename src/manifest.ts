import { fs, parseArgs, parse, path, YAML } from "./dependencies.ts";
import { parseCommandLine } from "./util.ts";

// result | name | args
// avoid content --contains=google
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

  constructor(private stringifiedYamlText: string) {
    this.setRules(stringifiedYamlText);
  }

  static load(filePath: string) {
    const fileExt = path.extname(filePath).slice(1);
    console.log('fileExt', fileExt);
    if (fileExt && fileExt !== 'yaml' && fileExt !== 'yml') {
      throw new Error("Manifest file should have a .yml or .yaml file extension");
    }
    const file = fs.readFileSync(filePath, 'utf8')
    // console.log("yaml parse: ", YAML.parse(file));
    // console.log("yaml stringify: ", YAML.stringify(YAML.parse(file)));
    const stringifiedYamlText = YAML.stringify(YAML.parse(file));
    return new Manifest(stringifiedYamlText);
  }

  private setRules(stringifiedYamlText: string) {
    // example: { recommend: [ { license: [ "GPL" ] } ] }
    const parsedYaml = YAML.parse(stringifiedYamlText);
    console.log('parsedYaml: ', parsedYaml);
    let contains, line;
    for (const [keyResult, valueOuterArr] of Object.entries(parsedYaml)) {
      for (let objIdx = 0; objIdx < valueOuterArr.length; objIdx++) {
        for (const [keyName, valueInnerArr] of Object.entries(valueOuterArr[objIdx])) {
          for (let idx = 0; idx < valueInnerArr.length; idx++) {
            contains = valueInnerArr[idx].trim() !== "" && valueInnerArr[idx].trim();
            line = `${keyResult} ${keyName} --contains=${contains}`;
            this._rules.push(new Rule(line));
          }
        }
      }
    }
    console.log('this._rules: ', this._rules);
  }
}

