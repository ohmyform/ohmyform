FROM node:14-alpine AS builder
MAINTAINER OhMyForm <admin@ohmyform.com>

WORKDIR /usr/src/app

RUN apk update && apk add curl bash && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

COPY . ./

RUN yarn install --frozen-lock-file
RUN yarn build

# remove development dependencies
RUN npm prune --production

# run node prune
# there is some problem running node prune that then prevents the frontend to load (just start with /form/1 and it will crash)
#RUN /usr/local/bin/node-prune

FROM node:14-alpine
MAINTAINER OhMyForm <admin@ohmyform.com>

# Create a group and a user with name "ohmyform".
RUN addgroup --gid 9999 ohmyform && adduser -D --uid 9999 -G ohmyform ohmyform

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

ENV PORT=4000 \
    NODE_ENV=production

# Change to non-root privilege
USER ohmyform

CMD [ "yarn", "start" ]
