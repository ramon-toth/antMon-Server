# Installs the current application on a Node Image.
FROM node:16

# The qq is for silent output in the console
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

# Sets the path where the app is going to be installed
ENV NODE_ROOT /usr/app/

# Creates the directory and all the parents (if they don’t exist)
RUN mkdir -p $NODE_ROOT

# Sets the /usr/app as the active directory
WORKDIR $NODE_ROOT

COPY package.json ./

RUN npm install

COPY . .

# RUN npm run-script build:prod

EXPOSE 3033

CMD [ "node", "src/server.js" ]