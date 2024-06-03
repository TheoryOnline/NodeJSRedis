import { RedisArgument, ArrayReply, TuplesToMapReply, BlobStringReply, NumberReply, NullReply, UnwrapReply, Resp2Reply, Command, SimpleStringReply } from '../RESP/types';

export type XInfoGroupsReply = ArrayReply<TuplesToMapReply<[
  [SimpleStringReply<'name'>, BlobStringReply],
  [SimpleStringReply<'consumers'>, NumberReply],
  [SimpleStringReply<'pending'>, NumberReply],
  [SimpleStringReply<'last-delivered-id'>, NumberReply],
  /** added in 7.0 */
  [SimpleStringReply<'entries-read'>, NumberReply | NullReply],
  /** added in 7.0 */
  [SimpleStringReply<'lag'>, NumberReply],
]>>;

export default {
  FIRST_KEY_INDEX: 2,
  IS_READ_ONLY: true,
  transformArguments(key: RedisArgument) {
    return ['XINFO', 'GROUPS', key];
  },
  transformReply: {
    2: (reply: UnwrapReply<Resp2Reply<XInfoGroupsReply>>) => {
      return reply.map(group => {
        const unwrapped = group as unknown as UnwrapReply<typeof group>;
        return {
          name: unwrapped[1],
          consumers: unwrapped[3],
          pending: unwrapped[5],
          'last-delivered-id': unwrapped[7],
          'entries-read': unwrapped[9],
          lag: unwrapped[11]
        };
      });
    },
    3: undefined as unknown as () => XInfoGroupsReply
  }
} as const satisfies Command;
