FROM alpine:3.10
LABEL maintainer="Pedro Sanders <fonosterteam@fonoster.com>"

COPY . /chmodhelper
WORKDIR /chmodhelper

RUN apk add --update nodejs=10.19.0-r0 npm=10.19.0-r0 ;\
  npm -g install . ; \
  rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

CMD ["/bin/sh", "-c", "run-chmodhelper"]

VOLUME '/data'