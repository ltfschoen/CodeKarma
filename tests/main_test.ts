import { assertEquals } from "jsr:@std/assert@1";
import { parseArgs } from "../src/dependencies.ts";
import { processArgs } from "../src/main.ts";
import { Parameters } from "../src/types.ts";

Deno.test("cli args", async (t) => {
  const cliArgs: string[] = [
    "--manifest=codekarma.manifest", "--project=./", "--ignore=./docker,./plugins",
    "--include=./src", "--verbose=false", "--recursive=true", "--watch=false"
  ];

  const actualCliArgsParsed: Parameters = parseArgs(cliArgs);

  const actualCombinedArgs = processArgs(actualCliArgsParsed);
  const expectedCombinedArgs: Parameters = {
    manifest: "codekarma.manifest",
    project: "./",
    _: [],
    ignore: [
      "./docker",
      "./plugins",
    ],
    include: [
      "./src",
    ],
    verbose: false,
    recursive: true,
    watch: false,
  };
  // provide a step name and function
  await t.step("processes args", async () => {
    assertEquals(expectedCombinedArgs, actualCombinedArgs);
  });
});