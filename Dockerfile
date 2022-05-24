FROM node:18-alpine3.14

RUN mkdir src

RUN apk update && \
  apk upgrade && \
  apk add git && \
  apk add vim && \
  apk add bash && \
  npm install -g npm@latest nuxi nuxt3
