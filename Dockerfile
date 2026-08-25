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
    && mkdir -p /home/node/webapp/public \
    && cp -R web/build/* /home/node/webapp/public \
    && mkdir -p /home/node/webapp/api \
    && cp -R api/dist/* /home/node/webapp/api \
    && cd /home/node/webapp/api \
    && NODE_ENV=production npm install \
    && chown -R node:node /home/node/webapp \
    && rm -rf /usr/src/biscuit-trail

# Default environment variables/values
ENV NODE_ENV=production

# Use the node user
USER node
WORKDIR /home/node/webapp/api

# Define volumes used by ECS to share public html and extra nginx config with nginx container
VOLUME /home/node/webapp/public
VOLUME /home/node/webapp/nginx-conf

# Start the API server
CMD ["node", "api/server.js"]

# Build identity for the v2 pipeline. Last on purpose: nothing in the build
# needs the version, so a new build number invalidates no earlier layer.
# "dev" covers local builds; the pipeline passes --build-arg VERSION=<build>,
# which reaches here because build.sh already forwards $DOCKER_ARGS. This is
# the only build-baked identity value — everything environment-specific
# arrives at runtime, because the same image bytes run on both environments.
ARG VERSION="dev"
ENV DD_VERSION=${VERSION}
