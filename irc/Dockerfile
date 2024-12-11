FROM ubuntu:20.04

RUN apt-get update && apt-get install -y \
    inspircd \
    && rm -rf /var/lib/apt/lists/*

COPY config/inspircd.conf /etc/inspircd/inspircd.conf

USER irc
WORKDIR /home/irc

EXPOSE 6667

CMD ["inspircd", "--runasroot"] 