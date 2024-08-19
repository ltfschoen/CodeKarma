#!/bin/bash
deno run --allow-read ./src/main.ts --ignore=./docker,./plugins --include=./src --verbose=false --recursive=true --watch=false

deno run --allow-read ./src/main.ts --project=./samples/javascript-project --manifest=codekarma.manifest.yaml
