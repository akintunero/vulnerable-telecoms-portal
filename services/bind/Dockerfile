FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y bind9 bind9utils && \
    rm -rf /var/lib/apt/lists/*

COPY config/ /etc/bind/
COPY zones/ /etc/bind/zones/

EXPOSE 53/tcp 53/udp

CMD ["named", "-g", "-c", "/etc/bind/named.conf", "-u", "bind"] 