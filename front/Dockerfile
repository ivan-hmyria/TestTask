FROM node:13.12.0-alpine

WORKDIR /app
# set working directory
COPY ./front /app/
#COPY . .

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY front/package.json ./
COPY front/package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./
CMD ["npm", "start"]

