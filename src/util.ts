import { join } from "./dependencies.ts";

export async function listRecursively(directory: string, files: string[] = []) {
  for await (const entry of Deno.readDir(directory)) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory) {
      await listRecursively(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

export function parseCommandLine(inputLine: string): string[] {
  const regex = /(?:[^\s"]+|"[^"]*")+/g;
  return inputLine.match(regex)?.map(arg => arg.replace(/^"|"$/g, '')) || [];
}
