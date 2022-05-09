FROM node:12.18.1

# RUN apt-get update 
# RUN apt-get install npm node
RUN npm install -g npm

RUN mkdir app
COPY . ./app
WORKDIR /app/frontend


RUN cd /app/frontend
RUN npm install 
EXPOSE 3000

ENTRYPOINT ["npm", "start"]

