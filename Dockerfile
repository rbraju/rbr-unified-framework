FROM mcr.microsoft.com/playwright:v1.57.0-noble

WORKDIR /app

USER root
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

RUN chown -R pwuser:pwuser /app
USER pwuser
