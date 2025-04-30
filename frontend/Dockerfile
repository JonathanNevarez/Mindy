FROM node:18

WORKDIR /app


COPY . .
RUN npm install
RUN npm install react-router-dom

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host"]
