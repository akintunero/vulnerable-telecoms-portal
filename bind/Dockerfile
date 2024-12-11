FROM ubuntu:latest

RUN apt-get update && apt-get install -y bind9

COPY config/named.conf /etc/bind/named.conf
COPY zones/ /etc/bind/zones/

EXPOSE 53/udp

CMD ["named", "-g"] 