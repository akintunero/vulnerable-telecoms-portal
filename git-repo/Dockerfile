FROM ubuntu:20.04

RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /git

EXPOSE 9418

CMD ["git", "daemon", "--base-path=/git", "--export-all", "--reuseaddr", "--informative-errors", "--verbose"] 