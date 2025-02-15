FROM node:20-alpine AS build
WORKDIR /app
# Install Python and build dependencies
RUN apk update && \
  apk add --no-cache \
  python3 \
  make \
  g++ \
  py3-setuptools \
  python3-dev
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/Alter /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
# CMD ["npm", "start", "--", "--host", "0.0.0.0"]
