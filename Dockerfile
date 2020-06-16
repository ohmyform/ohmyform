FROM node:12-alpine as builder

WORKDIR /usr/src/app

COPY ui/ .

RUN yarn install --frozen-lockfile
RUN yarn export

FROM node:12-alpine
LABEL maintainer="OhMyForm <admin@ohmyform.com>"

# Create a group and a user with name "ohmyform".
RUN addgroup --gid 9999 ohmyform && adduser -D --uid 9999 -G ohmyform ohmyform

WORKDIR /usr/src/app

COPY api/ .
COPY --from=builder /usr/src/app/out /usr/src/app/public

RUN yarn install --frozen-lockfile
RUN yarn build

ENV PORT=3000 \
    SECRET_KEY=ChangeMe \
    CREATE_ADMIN=FALSE \
    ADMIN_EMAIL=admin@ohmyform.com \
    ADMIN_USERNAME=root \
    ADMIN_PASSWORD=root

EXPOSE 3000

# Change to non-root privilege
USER ohmyform

CMD [ "yarn", "start:prod" ]
