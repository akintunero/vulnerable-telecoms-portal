FROM ubuntu:latest

RUN apt-get update && apt-get install -y nfdump

COPY data/ /data/

CMD ["nfdump", "-r", "/data/sample.pcap"] 