import { ArrayReply, TuplesToMapReply, BlobStringReply, NumberReply, UnwrapReply, Resp2Reply, Command, SimpleStringReply } from '../RESP/types';

type ClusterLinksReply = ArrayReply<TuplesToMapReply<[
  [SimpleStringReply<'direction'>, BlobStringReply],
  [SimpleStringReply<'node'>, BlobStringReply],
  [SimpleStringReply<'create-time'>, NumberReply],
  [SimpleStringReply<'events'>, BlobStringReply],
  [SimpleStringReply<'send-buffer-allocated'>, NumberReply],
  [SimpleStringReply<'send-buffer-used'>, NumberReply],
]>>;

export default {
  FIRST_KEY_INDEX: undefined,
  IS_READ_ONLY: true,
  transformArguments() {
    return ['CLUSTER', 'LINKS'];
  },
  transformReply: {
    2: (reply: UnwrapReply<Resp2Reply<ClusterLinksReply>>) => reply.map(link => {
      const unwrapped = link as unknown as UnwrapReply<typeof link>;
      return {
        direction: unwrapped[1],
        node: unwrapped[3],
        'create-time': unwrapped[5],
        events: unwrapped[7],
        'send-buffer-allocated': unwrapped[9],
        'send-buffer-used': unwrapped[11]
      };
    }),
    3: undefined as unknown as () => ClusterLinksReply
  }
} as const satisfies Command;
