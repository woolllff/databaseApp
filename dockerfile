FROM node:12.16-alpine


RUN mkdir app
COPY . ./app
WORKDIR ./app/frontend
RUN 
RUN npm install 
EXPOSE 3000

ENTRYPOINT ["npm", "start"]

