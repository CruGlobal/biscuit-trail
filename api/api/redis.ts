import redis from 'redis';

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || '6379',
}

export const clientRedis = redis.createClient({ host: redisConfig.host, port: Number(redisConfig.port) });
clientRedis.once('ready', () => console.log('clientRedis connected'));
clientRedis.on('error', (err) => console.log(err));

export function setRedis(key, data) {
  clientRedis.set(key, JSON.stringify(data));
}
