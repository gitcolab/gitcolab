FROM debian:jessie

MAINTAINER Mlanawo Mbechezi <mlanawo.mbechezi@ikimea.com>

RUN apt-get update && apt-get install -y git

RUN adduser --disabled-login --gecos 'Gitcolab' git

WORKDIR /opt/git/gitcolab
