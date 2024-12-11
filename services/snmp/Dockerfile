FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y snmpd snmp && \
    rm -rf /var/lib/apt/lists/*

COPY config/snmpd.conf /etc/snmp/snmpd.conf

EXPOSE 161/udp

CMD ["snmpd", "-f", "-Lo"] 