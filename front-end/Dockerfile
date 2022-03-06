FROM node:alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3006:3006
ENV CI=true
RUN npm run test
RUN npm run build
CMD ["npm", "start"]