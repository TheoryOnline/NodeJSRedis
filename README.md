<p align="center">
    <a href="https://github.com/redis/node-redis">
        <img width="128" src="https://static.invertase.io/assets/node_redis_logo.png" />
    </a>
    <h2 align="center">Node Redis</h2>
</p>
# Hacktoberfest 2021
<div align="center">
    <a href="https://coveralls.io/github/redis/node-redis">
        <img src="https://coveralls.io/repos/github/redis/node-redis/badge.svg" alt="Coverage Status"/>
    </a>
    <a href="https://www.npmjs.com/package/redis/v/next">
        <img src="https://img.shields.io/npm/dm/redis.svg" alt="Downloads"/>
    </a>
    <a href="https://www.npmjs.com/package/redis/v/next">
        <img src="https://img.shields.io/npm/v/redis/next.svg" alt="Version"/>
    </a>
    <a href="https://discord.gg/XMMVgxUm">
        <img src="https://img.shields.io/discord/697882427875393627" alt="Chat"/>
    </a>
</div>

---

## Installation

```bash
npm install redis@next
```

> :warning: The new interface is clean and cool, but if you have an existing code base, you'll want to read the [migration guide](./docs/v3-to-v4.md).

## Usage

### Basic Example

```typescript
import { createClient } from 'redis';

(async () => {
  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('key', 'value');
  const value = await client.get('key');
})();
```

The above code connects to localhost on port 6379. To connect to a different host or port, use a connection string in the format `redis[s]://[[username][:password]@][host][:port][/db-number]`:

```typescript
createClient({
  url: 'redis://alice:foobared@awesome.redis.server:6380'
});
```

You can also use discrete parameters, UNIX sockets, and even TLS to connect. Details can be found in the [client configuration guide](./docs/client-configuration.md).

### Redis Commands

There is built-in support for all of the [out-of-the-box Redis commands](https://redis.io/commands). They are exposed using the raw Redis command names (`HSET`, `HGETALL`, etc.) and a friendlier camel-cased version (`hSet`, `hGetAll`, etc.):

```typescript
// raw Redis commands
await client.HSET('key', 'field', 'value');
await client.HGETALL('key');

// friendly JavaScript commands
await client.hSet('key', 'field', 'value');
await client.hGetAll('key');
```

Modifiers to commands are specified using a JavaScript object:

```typescript
await client.set('key', 'value', {
  EX: 10,
  NX: true
});
```

Replies will be transformed into useful data structures:

```typescript
await client.hGetAll('key'); // { field1: 'value1', field2: 'value2' }
await client.hVals('key'); // ['value1', 'value2']
```

### Unsupported Redis Commands

If you want to run commands and/or use arguments that Node Redis doesn't know about (yet!) use `.sendCommand()`:

```typescript
await client.sendCommand(['SET', 'key', 'value', 'NX']); // 'OK'

await client.sendCommand(['HGETALL', 'key']); // ['key1', 'field1', 'key2', 'field2']
```

### Transactions (Multi/Exec)

Start a [transaction](https://redis.io/topics/transactions) by calling `.multi()`, then chaining your commands. When you're done, call `.exec()` and you'll get an array back with your results:

```typescript
await client.set('another-key', 'another-value');

const [setKeyReply, otherKeyValue] = await client
  .multi()
  .set('key', 'value')
  .get('another-key')
  .exec(); // ['OK', 'another-value']
```

You can also [watch](https://redis.io/topics/transactions#optimistic-locking-using-check-and-set) keys by calling `.watch()`. Your transaction will abort if any of the watched keys change.

To dig deeper into transactions, check out the [Isolated Execution Guide](./docs/isolated-execution.md).

### Blocking Commands

Any command can be run on a new connection by specifying the `isolated` option. The newly created connection is closed when the command's `Promise` is fulfilled.

This pattern works especially well for blocking commands—such as `BLPOP` and `BLMOVE`:

```typescript
import { commandOptions } from 'redis';

const blPopPromise = client.blPop(commandOptions({ isolated: true }), 'key');

await client.lPush('key', ['1', '2']);

await blPopPromise; // '2'
```

To learn more about isolated execution, check out the [guide](./docs/isolated-execution.md).

### Pub/Sub

Subscribing to a channel requires a dedicated stand-alone connection. You can easily get one by `.duplicate()`ing an existing Redis connection.

```typescript
const subscriber = client.duplicate();

await subscriber.connect();
```

Once you have one, simply subscribe and unsubscribe as needed:

```typescript
await subscriber.subscribe('channel', (message) => {
  console.log(message); // 'message'
});

await subscriber.pSubscribe('channe*', (message, channel) => {
  console.log(message, channel); // 'message', 'channel'
});

await subscriber.unsubscribe('channel');

await subscriber.pUnsubscribe('channe*');
```

Publish a message on a channel:

```typescript
await publisher.publish('channel', 'message');
```

### Scan Iterator

[`SCAN`](https://redis.io/commands/scan) results can be looped over using [async iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator):

```typescript
for await (const key of client.scanIterator()) {
  // use the key!
  await client.get(key);
}
```

This works with `HSCAN`, `SSCAN`, and `ZSCAN` too:

```typescript
for await (const { field, value } of client.hScanIterator('hash')) {}
for await (const member of client.sScanIterator('set')) {}
for await (const { score, member } of client.zScanIterator('sorted-set')) {}
```

You can override the default options by providing a configuration object:

```typescript
client.scanIterator({
  TYPE: 'string', // `SCAN` only
  MATCH: 'patter*',
  COUNT: 100
});
```

### Lua Scripts

Define new functions using [Lua scripts](https://redis.io/commands/eval) which execute on the Redis server:

```typescript
import { createClient, defineScript } from 'redis';

(async () => {
  const client = createClient({
    scripts: {
      add: defineScript({
        NUMBER_OF_KEYS: 1,
        SCRIPT:
          "local val = redis.pcall('GET', KEYS[1]);" + "return val + ARGV[1];",
        transformArguments(key: string, toAdd: number): Array<string> {
          return [key, toAdd.toString()];
        },
        transformReply(reply: number): number {
          return reply;
        }
      })
    }
  });

  await client.connect();

  await client.set('key', '1');
  await client.add('key', 2); // 3
})();
```

### Disconnecting

There are two functions that disconnect a client from the Redis server. In most scenarios you should use `.quit()` to ensure that pending commands are sent to Redis before closing a connection.

#### `.QUIT()`/`.quit()`

Gracefully close a client's connection to Redis, by sending the [`QUIT`](https://redis.io/commands/quit) command to the server. Before quitting, the client executes any remaining commands in its queue, and will receive replies from Redis for each of them.

```typescript
const [ping, get, quit] = await Promise.all([
  client.ping(),
  client.get('key'),
  client.quit()
]); // ['PONG', null, 'OK']

try {
  await client.get('key');
} catch (err) {
  // ClosedClient Error
}
```

#### `.disconnect()`

Forcibly close a client's connection to Redis immediately. Calling `disconnect` will not send further pending commands to the Redis server, or wait for or parse outstanding responses.

```typescript
await client.disconnect();
```

### Auto-Pipelining

Node Redis will automatically pipeline requests that are made during the same "tick".

```typescript
client.set('Tm9kZSBSZWRpcw==', 'users:1');
client.sAdd('users:1:tokens', 'Tm9kZSBSZWRpcw==');
```

Of course, if you don't do something with your Promises you're certain to get [unhandled Promise exceptions](https://nodejs.org/api/process.html#process_event_unhandledrejection). To take advantage of auto-pipelining and handle your Promises, use `Promise.all()`.

```typescript
await Promise.all([
  client.set('Tm9kZSBSZWRpcw==', 'users:1'),
  client.sAdd('users:1:tokens', 'Tm9kZSBSZWRpcw==')
]);
```

### Clustering

Check out the [Clustering Guide](./docs/clustering.md) when using Node Redis to connect to a Redis Cluster.

## Supported Redis versions

Node Redis is supported with the following versions of Redis:

| Version | Supported          |
|---------|--------------------|
| 6.2.z   | :heavy_check_mark: |
| 6.0.z   | :heavy_check_mark: |
| 5.y.z   | :heavy_check_mark: |
| < 5.0   | :x:                |

> Node Redis should work with older versions of Redis, but it is not fully tested and we cannot offer support.

## Contributing

If you'd like to contribute, check out the [contributing guide](CONTRIBUTING.md).

Thank you to all the people who already contributed to Node Redis!

<a href="https://github.com/redis/node-redis/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=redis/node-redis"/>
</a>

## License

This repository is licensed under the "MIT" license. See [LICENSE](LICENSE).
