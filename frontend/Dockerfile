 # Use a Node.js base image
 FROM node:20-alpine

 # Set the working directory
 WORKDIR /app

 # Copy package.json and package-lock.json first
 COPY package*.json ./

 # Install dependencies
 RUN npm install

 # Copy the rest of the application code
 COPY . .
  
 EXPOSE 5173

 # Command to start the Vite development server
#  CMD ["npm", "run", "dev"]