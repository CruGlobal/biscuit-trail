FROM 056154071827.dkr.ecr.us-east-1.amazonaws.com/base-image-openresty

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && apt-get install -y build-essential nodejs \
  && rm -r /var/lib/apt/lists/*

# Copy container configuration
COPY docker /

# Copy app into the container (excludes files in .dockerignore)
COPY . /usr/src/biscuit-trail
RUN PATH="./node_modules/.bin:$PATH" \
    && cd /usr/src/biscuit-trail \
    && npm --unsafe-perm install \
    && npm run build:api \
    && npm run build:web \
    && mkdir -p /home/app/webapp/api \
    && cp -R web/build/* /home/app/webapp/public \
    && cp -R api/dist/* /home/app/webapp/api \
    && cd /home/app/webapp/api \
    && NODE_ENV=production npm install \
    && rm -rf /usr/src/biscuit-trail

RUN adduser --disabled-password --home=/nodejs --gecos "" nodejs
RUN mkdir -p /home/app/webapp
RUN chown -R nodejs /home/app/webapp

# Default environment variables/values
ENV NODE_ENV=production
