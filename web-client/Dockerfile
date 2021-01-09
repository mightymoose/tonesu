FROM node:15.5.1 as builder

WORKDIR /tonesu

ENV PATH /tonesu/node_modules/.bin:$PATH

COPY ./package*.json /tonesu/
RUN npm install

COPY . /tonesu
RUN npm run build

FROM nginx:1.19.6
COPY --from=builder /tonesu/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]