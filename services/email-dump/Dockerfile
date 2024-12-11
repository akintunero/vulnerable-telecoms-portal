FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y postfix && \
    rm -rf /var/lib/apt/lists/*

COPY config/main.cf /etc/postfix/main.cf

EXPOSE 25

CMD ["postfix", "start-fg"] 