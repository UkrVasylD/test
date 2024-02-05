const { createClient } = require('redis');

const client = createClient();

class RedisAdapter {
  async connect() {
    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    console.log('redis connected');
  }

  async setValue(key, value) {
    return await client.set(key, value);
  }

  async getValue(key) {
    const value = await client.get(key);

    return value;
  }

  async delKeys(key) {
    await client.del(key, function (err, reply) {
      console.log('Redis Del', reply);
    });
  }
}

module.exports = { redisAdapter: new RedisAdapter() };
