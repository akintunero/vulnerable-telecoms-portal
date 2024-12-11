FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y frr frr-pythontools

COPY config/bgpd.conf /etc/frr/bgpd.conf
COPY config/daemons /etc/frr/daemons

EXPOSE 179

CMD ["/usr/lib/frr/frrinit.sh", "start"] 