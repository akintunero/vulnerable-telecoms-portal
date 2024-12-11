FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y vsftpd && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p /var/run/vsftpd/empty && \
    mkdir -p /var/ftp/backup && \
    chmod 777 /var/ftp && \
    chmod 777 /var/ftp/backup

COPY config/vsftpd.conf /etc/vsftpd.conf

EXPOSE 21

CMD ["sh", "-c", "vsftpd -v /etc/vsftpd.conf & tail -f /dev/null"] 