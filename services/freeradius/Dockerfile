FROM --platform=linux/arm64/v8 freeradius/freeradius-server:3.0

COPY config/ /etc/freeradius/

EXPOSE 1812/udp 1813/udp

CMD ["freeradius", "-f"] 