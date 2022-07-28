## Build UI
FROM node:16-alpine as ui

WORKDIR /usr/src/ui

RUN apk --update --no-cache add curl bash g++ make libpng-dev

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

COPY ui/ .

RUN yarn install --frozen-lockfile
RUN yarn build

# remove development dependencies
RUN npm prune --production

# run node prune
# there is some problem running node prune that then prevents the frontend to load (just start with /form/1 and it will crash)
#RUN /usr/local/bin/node-prune

## Build API
FROM node:16-alpine as api
LABEL maintainer="OhMyForm <admin@ohmyform.com>"

WORKDIR /usr/src/api

RUN apk --update --no-cache add curl bash g++ make libpng-dev

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

COPY api/ .

RUN touch /usr/src/api/src/schema.gql && chown 9999:9999 /usr/src/api/src/schema.gql

RUN yarn install --frozen-lockfile
RUN yarn build

# remove development dependencies
RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

## Production Image.
FROM node:16-alpine

RUN apk --update add supervisor nginx && rm -rf /var/cache/apk/*

WORKDIR /usr/src

COPY --from=api /usr/src/api /usr/src/api
COPY --from=ui /usr/src/ui /usr/src/ui

RUN addgroup --gid 9999 ohmyform && adduser -D --uid 9999 -G ohmyform ohmyform
ENV SECRET_KEY=ChangeMe \
    CREATE_ADMIN=FALSE \
    ADMIN_EMAIL=admin@ohmyform.com \
    ADMIN_USERNAME=root \
    ADMIN_PASSWORD=root \
    NODE_ENV=production

EXPOSE 3000

RUN mkdir -p /run/nginx/
RUN touch /usr/src/supervisord.log && chmod 777 /usr/src/supervisord.log
COPY supervisord.conf /etc/supervisord.conf
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
# CMD [ "yarn", "start:prod" ]
