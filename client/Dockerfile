FROM nginx:1.23.3-alpine AS build
ARG VITE_AES_SECRET_KEY # you could give this a default value as well
ENV VITE_AES_SECRET_KEY=$VITE_AES_SECRET_KEY
ARG VITE_API_URL # you could give this a default value as well
ENV VITE_API_URL=$VITE_API_URL
COPY dist /usr/share/nginx/html
