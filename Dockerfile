FROM ohmyform/ui as builder

RUN yarn export

FROM  ohmyform/api

LABEL maintainer="OhMyForm <admin@ohmyform.com>"

COPY --from=builder /usr/src/app/out /usr/src/app/public
