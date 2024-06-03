import { ArrayReply, TuplesToMapReply, BlobStringReply, NumberReply, UnwrapReply, Resp2Reply, Command, SimpleStringReply } from '../RESP/types';

export type ModuleListReply = ArrayReply<TuplesToMapReply<[
  [SimpleStringReply<'name'>, BlobStringReply],
  [SimpleStringReply<'ver'>, NumberReply],
]>>;

export default {
  FIRST_KEY_INDEX: undefined,
  IS_READ_ONLY: true,
  transformArguments() {
    return ['MODULE', 'LIST'];
  },
  transformReply: {
    2: (reply: UnwrapReply<Resp2Reply<ModuleListReply>>) => {
      return reply.map(module => {
        const unwrapped = module as unknown as UnwrapReply<typeof module>;
        return {
          name: unwrapped[1],
          ver: unwrapped[3]
        };
      });
    },
    3: undefined as unknown as () => ModuleListReply
  }
} as const satisfies Command;
