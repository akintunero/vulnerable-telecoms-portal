FROM freeradius/freeradius-server:latest

COPY clients.conf /etc/raddb/clients.conf
COPY users /etc/raddb/users
COPY config/radiusd.conf /etc/freeradius/radiusd.conf

EXPOSE 1812/udp

CMD ["radiusd", "-X"] 