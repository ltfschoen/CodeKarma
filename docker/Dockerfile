# This is the build stage for Substrate. Here we create the binary.
FROM ubuntu:latest

WORKDIR /codekarma
COPY . /codekarma

ENV SHELL /bin/bash
# use ARG so not only set during build time
ARG DEBIAN_FRONTEND=noninteractive
ARG DEBCONF_NOWARNINGS="yes"

ENV USER=user
# install Docker is required to use Act
# https://docs.docker.com/desktop/install/linux-install/#kvm-virtualization-support
RUN echo "Running" \
  && apt-get update -y && apt-get upgrade -y \
  && apt-get install git vim curl unzip -y \
  && useradd -m -u 2000 -U -s /bin/sh -d /$USER $USER \
  && chown -R $USER:$USER /codekarma \
  && curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | bash \
  && echo "Ready"

USER $USER
EXPOSE 5000
VOLUME ["/codekarma"]
