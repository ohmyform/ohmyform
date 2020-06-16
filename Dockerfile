## Build API
FROM node:12 as api

WORKDIR /usr/src/app

COPY ui/ .

RUN yarn install --frozen-lockfile
RUN yarn export

## Build APP
FROM node:12 as app
LABEL maintainer="OhMyForm <admin@ohmyform.com>"

WORKDIR /usr/src/app

COPY api/ .
COPY --from=api /usr/src/app/out /usr/src/app/public

RUN yarn install --frozen-lockfile
RUN yarn build

## Glue
RUN touch /usr/src/app/src/schema.gql && chown ohmyform:ohmyform /usr/src/app/src/schema.gql

## Production Image.
FROM node:12

WORKDIR /usr/src/app
COPY --from=app /usr/src/app /usr/src/app
RUN addgroup --gid 9999 ohmyform && adduser --disabled-login --uid 9999 --gid 9999 ohmyform
ENV PORT=3000 \
    SECRET_KEY=ChangeMe \
    CREATE_ADMIN=FALSE \
    ADMIN_EMAIL=admin@ohmyform.com \
    ADMIN_USERNAME=root \
    ADMIN_PASSWORD=root

EXPOSE 3000
USER ohmyform
CMD [ "yarn", "start:prod" ]
