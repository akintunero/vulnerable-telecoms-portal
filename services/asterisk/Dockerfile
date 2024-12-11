FROM debian:bullseye-slim

RUN apt-get update && \
    apt-get install -y asterisk && \
    rm -rf /var/lib/apt/lists/*

COPY config/ /etc/asterisk/

EXPOSE 5060/udp 5060/tcp

CMD ["asterisk", "-f"] 