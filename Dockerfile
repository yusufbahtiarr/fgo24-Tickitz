FROM node:lts-alpine
WORKDIR /workspace

ARG VITE_TMDB_API_KEY
ENV VITE_TMDB_API_KEY=$VITE_TMDB_API_KEY

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=0 /workspace/dist/ /usr/share/nginx/html/
# COPY .nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]