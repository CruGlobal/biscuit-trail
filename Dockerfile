FROM public.ecr.aws/docker/library/node:16-alpine

# DataDog Autodiscovery log source
LABEL com.datadoghq.ad.logs='[{"source": "nodejs"}]'

# Upgrade alpine packages (useful for security fixes)
RUN apk upgrade --no-cache

# Copy app into the container (excludes files in .dockerignore)
COPY . /usr/src/biscuit-trail
RUN PATH="./node_modules/.bin:$PATH" \
    && cd /usr/src/biscuit-trail \
    && npm install \
    && npm run build:api \
    && npm run build:web \
    && mkdir -p /home/app/webapp/public \
    && cp -R web/build/* /home/app/webapp/public \
    && mkdir -p /home/app/webapp/api \
    && cp -R api/dist/* /home/app/webapp/api \
    && cd /home/app/webapp/api \
    && NODE_ENV=production npm install \
    && chown -R node /home/app/webapp \
    && rm -rf /usr/src/biscuit-trail

# Copy custom nginx config
COPY nginx-conf /home/app/webapp/nginx-conf

# Default environment variables/values
ENV NODE_ENV=production

# Use the node user
USER node
WORKDIR /home/app/webapp/api

# Define volumes used by ECS to share public html and extra nginx config with nginx container
VOLUME /home/app/webapp/public
VOLUME /home/app/webapp/nginx-conf

# Start the API server
CMD ["node", "api/server.js"]
