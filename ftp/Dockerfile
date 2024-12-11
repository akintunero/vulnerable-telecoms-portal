FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y vsftpd && \
    mkdir -p /var/run/vsftpd/empty && \
    mkdir -p /var/ftp && \
    mkdir -p /var/log/ftp

COPY config/vsftpd.conf /etc/vsftpd.conf
COPY data/ /var/ftp/
COPY logs/ /var/log/ftp/

EXPOSE 21

CMD ["vsftpd"] 