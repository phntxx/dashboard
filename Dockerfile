# Get current image of node.js
FROM node:current-slim

# Set /app as directory where the app should be at
WORKDIR /app

# Copy all of the relevant files over to the container
COPY . .

# Download dependencies, build container
RUN yarn
RUN [ "yarn", "build" ]

# Expose the two relevant ports
EXPOSE 3000 8080

# Serve the app
CMD [ "yarn", "serve:production" ]