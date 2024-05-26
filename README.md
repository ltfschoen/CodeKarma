# Code Karma

> A CLI tool to check that the code you write aligns with your values written in your manifesto.

Simple Deno CLI app using Act for local Github Actions to demonstrate checking
compliance of dependencies in a repository against a manifesto.

# Use

To check your code, go to the root folder of your project and run `codekarma` 
It will expect a manifest, either in the root folder called `codekarma.manifest` or you pass different location with the `--manifest` flag.

```bash
codekarma --manifest my.manifest
```

# Contribute

## Setup

Assuming VS code or similar. 
Go to marketplace and add Deno extension (ID denoland.vscode-deno).
Install the (Deno CLI)[https://deno.com/#installation].

## Project Scrum Board

https://github.com/users/ltfschoen/projects/2

## Install Dependencies

* Install [Docker](https://docs.docker.com/get-docker/)
* Build Docker container from image
```
docker rm -f ltfschoen-ethberlin04
docker images | grep ltfschoen-ethberlin04 | awk '{print $3}' | xargs docker rmi -f
unset DOCKER_DEFAULT_PLATFORM

export DOCKER_DEFAULT_PLATFORM=linux/amd64
./docker/build.sh
```
* Run Docker container
./docker/run.sh
```
* Enter shell of Docker container
```
docker exec --user root -it ltfschoen-ethberlin04 /bin/bash

./bin/act --help
```

* Show docker url for the engine running with docker-desktop, point docker-compose to the engine running with the desktop UI
  * https://nektosact.com/usage/custom_engine.html
  * https://nektosact.com/missing_functionality/docker_context.html
```
docker context list
export DOCKER_HOST="unix:///var/run/docker.sock"
source ~/.bashrc
```

* Run within Docker container all jobs named 'run' in Github Actions locally using Act
https://nektosact.com/usage/index.html#workflows
```
./bin/act --container-options \"--privileged\" --workflows '.github/workflows/dev.yml' -j 'run' --json --platform ubuntu-18.04=nektos/act-environments-ubuntu:18.04 --watch
```

* Note: Default image and other options can be changed manually in ~/.actrc (please refer to https://github.com/nektos/act#configuration for additional information about file structure)
