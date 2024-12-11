FROM ubuntu:latest

RUN apt-get update && apt-get install -y snmpd

COPY snmpd.conf /etc/snmp/snmpd.conf

EXPOSE 161/udp

CMD ["snmpd", "-f", "-Lo"] 