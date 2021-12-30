FROM node:12.18.3
WORKDIR /app/backend

COPY ["package.json", "package-lock.json", "./"]

RUN npm install
COPY . .

EXPOSE 4000
CMD [ "npm", "run", "dev" ]