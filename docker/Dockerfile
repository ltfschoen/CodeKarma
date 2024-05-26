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
  # && apt-get remove docker docker-engine docker.io containerd runc \
  && apt-get update -y && apt-get upgrade -y \
  && apt-get install git vim curl unzip -y \
  # && apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common -y \
  # && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - \
  # && apt-key fingerprint 0EBFCD88 \
  # && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  # && apt-get update \
  # && apt-get install docker-ce docker-ce-cli containerd.io -y \
  && useradd -m -u 1000 -U -s /bin/sh -d /$USER $USER \
  && chown -R $USER:$USER /codekarma \
  # && adduser $USER \
  # && usermod -aG docker $USER
  # \
  #
  # use /etc/init.d/docker instead of systemd
  # otherwise get error `System has not been booted with systemd as init system (PID 1). Can't operate.`
  # && systemctl restart docker \
  # && systemctl enable docker \
  # && ls -al /etc/init.d/docker \
  # && chown -R root /etc/init.d/docker 
  # \
  # start|stop|restart|status
  # && /etc/init.d/docker --help \
  # && /etc/init.d/docker start \
  # && service docker start \
  # && apt-get install -y docker-compose-plugin \
  # && apt-get install docker-compose \
  # enter password
  # install Act
  # https://nektosact.com/installation/index.html
  #
  # Try these:
  #   * `act -j test` - run the tests
  #   * `act` - run the the entire pipeline
  #   * `act -l` - view the execution graph
  && curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | bash
  
  # \
  # && cp /codekarma/dist/codekarma /usr/local/bin \
  # && /usr/local/bin/codekarma --version \
  # && echo "Ready"

USER $USER
EXPOSE 5000
VOLUME ["/codekarma"]
