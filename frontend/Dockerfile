FROM node:18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine

# Copia el build
COPY --from=build /app/dist /usr/share/nginx/html

# 🔧 Agrega esta línea para usar tu nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
