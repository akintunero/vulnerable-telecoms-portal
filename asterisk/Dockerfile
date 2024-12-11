FROM debian:bullseye-slim

RUN apt-get update && \
    apt-get install -y build-essential wget subversion libxml2-dev libncurses5-dev uuid-dev libjansson-dev libssl-dev libsqlite3-dev libedit-dev && \
    mkdir -p /usr/src/asterisk && \
    cd /usr/src/asterisk && \
    wget http://downloads.asterisk.org/pub/telephony/asterisk/asterisk-18-current.tar.gz && \
    tar xzf asterisk-18-current.tar.gz --strip-components=1 && \
    contrib/scripts/get_mp3_source.sh && \
    ./configure && \
    make menuselect.makeopts && \
    menuselect/menuselect --enable CORE-SOUNDS-EN-GSM --enable MOH-OPSOUND-WAV --enable EXTRA-SOUNDS-EN-GSM menuselect.makeopts && \
    make -j$(nproc) && make install && make samples && make config && \
    cd / && rm -rf /usr/src/asterisk && \
    apt-get remove --purge -y build-essential wget subversion && \
    apt-get autoremove -y && apt-get clean

COPY config/sip.conf /etc/asterisk/sip.conf
COPY config/extensions.conf /etc/asterisk/extensions.conf

EXPOSE 5060/udp

CMD ["/usr/sbin/asterisk", "-f", "-U", "root"]
