FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN apt-get update && \
    apt-get install -y gcc libfreetype6-dev libjpeg-dev zlib1g-dev python3-dev && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get remove -y gcc python3-dev && apt-get autoremove -y && apt-get clean

COPY . .

EXPOSE 8001

CMD ["python", "app.py"] 