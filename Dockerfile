# Set-up Container
FROM node:10.15.1-alpine

RUN mkdir -p /app
WORKDIR /app

# Copy App Contents Into Container
COPY . .

# Install App Dependencies
RUN npm run install-script-dev

# Remove Root Privileges
COPY --chown=node:node . .
USER node

# 3001 -> Node.js Server
# 3000 -> React Client
EXPOSE 3001
EXPOSE 3000

CMD ["npm", "run", "app"]