FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y isc-dhcp-server && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p /var/lib/dhcp && \
    chmod 777 /var/lib/dhcp

COPY config/dhcpd.conf /etc/dhcp/dhcpd.conf

EXPOSE 67/udp

CMD ["dhcpd", "-f", "-d", "--no-pid"] 