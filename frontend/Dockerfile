FROM node:18

# set working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install app dependencies
RUN npm install

# copy all files to the working directory
COPY . .

# serve the app
CMD ["npm", "start"]

# expose port if necessary
EXPOSE 3000
