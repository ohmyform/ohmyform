FROM alpine:edge
## TODO: Reconsider this.
RUN apk add --no-cache nginx certbot openssl python py-jinja2

COPY *.py /
COPY conf /conf

RUN chmod +x /start.py && \
    chmod +x /letsencrypt.py && \
    chmod +x /config.py

ENV NODE_ENV development \
    PORT=5000 \
    SOCKET_PORT=20523 \
    TLS_FLAVOR=notls \
    BASE_URL=localhost \
    SUBDOMAIN_URL=*.localhost \
    SOCKETS_URL=ws.localhost

CMD /start.py
