# Code Karma

> A CLI tool to check that the code you write aligns with your values written in your manifesto.

# Overview

Simple Deno CLI app using Act for local Github Actions to demonstrate checking
compliance of dependencies in a repository against a manifesto of an ideology.

# Project Scrum Board

https://github.com/users/ltfschoen/projects/2

# Working Demo

* Setup VS Code or A or similar. 
  * Go to marketplace and add Deno extension (ID denoland.vscode-deno).
* Install the (Deno CLI)[https://deno.com/#installation].
* Run the following command:
```bash
./run.sh
```
* View output
[preview](./screenshots/preview.png)

## WIP - Check my dependencies

To check your code, go to the root folder of your project and run `codekarma` 
It will expect a manifest, either in the root folder called `codekarma.manifest` or you pass different location with the `--manifest` flag.

```bash
codekarma --manifest my.manifest
```

# Working Demo with Github Actions using Act in a Docker container 

* Install [Docker](https://docs.docker.com/get-docker/)
* Build Docker container from image
```
export DOCKER_DEFAULT_PLATFORM=linux/amd64
./docker/build.sh
```

* Run Docker container
```
./docker/run.sh
```

* Enter shell of Docker container
```
docker exec --user root -it ltfschoen-ethberlin04 /bin/bash
```

* Run within Docker container all jobs named 'run' in Github Actions locally using Act
https://nektosact.com/usage/index.html#workflows
```
./bin/act --container-options \"--privileged\" --workflows '.github/workflows/dev.yml' -j 'run' --json --platform ubuntu-18.04=nektos/act-environments-ubuntu:18.04 --watch
```

* Note: Default image and other options can be changed manually in ~/.actrc (please refer to https://github.com/nektos/act#configuration for additional information about file structure)

* Remove Docker container `docker stop ltfschoen-ethberlin04 && docker rm ltfschoen-ethberlin04`

## Troubleshooting

* Show docker url for the engine running with docker-desktop, point docker-compose to the engine running with the desktop UI
  * https://nektosact.com/usage/custom_engine.html
  * https://nektosact.com/missing_functionality/docker_context.html
```
docker context list
export DOCKER_HOST="unix:///var/run/docker.sock"
source ~/.bashrc
```
