FROM node:12 as builder

WORKDIR /usr/src/app

COPY ui/ .

RUN yarn install --frozen-lockfile
RUN yarn export

FROM node:12
LABEL maintainer="OhMyForm <admin@ohmyform.com>"

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

CMD [ "yarn", "start:prod" ]
