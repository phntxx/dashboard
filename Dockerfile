FROM node:lts AS build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --prod

COPY . ./
RUN yarn build

FROM ratisbonacoding/nginx-cloudflare-cache
COPY --from=build /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf