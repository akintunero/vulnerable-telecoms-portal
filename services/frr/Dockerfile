FROM frrouting/frr:latest

COPY config/frr.conf /etc/frr/frr.conf

EXPOSE 179/tcp

CMD ["/usr/lib/frr/docker-start"] 