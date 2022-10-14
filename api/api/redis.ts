import redis from 'redis';

const redisConfig = {
  host: 'localhost',
  // host: process.env.SESSION_REDIS_HOST || 'localhost',
  port: process.env.SESSION_REDIS_PORT || '6379',
  dbIndex: '0',
  // dbIndex: process.env.SESSION_REDIS_DB_INDEX || '0'
}

export const clientRedis = redis.createClient({ host: redisConfig.host, port: Number(redisConfig.port), db: redisConfig.dbIndex });
clientRedis.once('ready', () => console.log('clientRedis connected'));
clientRedis.on('error', (err) => console.log(err));

export function setRedis(key, data) {
  clientRedis.set(key, JSON.stringify(data)); 
}
