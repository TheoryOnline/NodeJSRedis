import { RedisArgument, BlobStringReply, NullReply, Command } from '../RESP/types';

export default {
  FIRST_KEY_INDEX: 1,
  IS_READ_ONLY: true,
  transformArguments(key: RedisArgument) {
    return ['GET', key];
  },
  getCacheInfo(key: RedisArgument) {
    return {
      cacheKey: `get_${key.toString()}`,
      redisKeys: [key.toString()]
    }
  },
  transformReply: undefined as unknown as () => BlobStringReply | NullReply
} as const satisfies Command;
