import { RedisArgument, Command, ReplyUnion, UnwrapReply, ArrayReply } from '@redis/client/dist/lib/RESP/types';
import { RedisVariadicArgument } from '@redis/client/dist/lib/commands/generic-transformers';
import { MRangeRawReply2, MRangeReplyItem2, TsMRangeOptions, pushGroupByArgument } from './MRANGE';
import { Labels, SampleRawReply2, Timestamp, pushWithLabelsArgument, transformLablesReply, transformSamplesReply } from '.';
import { pushFilterArgument } from './MGET';
import { pushRangeArguments } from './RANGE';

export interface TsMRangeWithLabelsOptions extends TsMRangeOptions {
  SELECTED_LABELS?: RedisVariadicArgument;
}

export function transformMRangeWithLabelsArguments(
  command: RedisArgument,
  fromTimestamp: Timestamp,
  toTimestamp: Timestamp,
  filter: RedisVariadicArgument,
  options?: TsMRangeWithLabelsOptions
) {
  let args = pushRangeArguments([command], fromTimestamp, toTimestamp, options);
  args = pushWithLabelsArgument(args, options?.SELECTED_LABELS);
  args = pushFilterArgument(args, filter);
  return pushGroupByArgument(args, options?.GROUPBY);
}

export interface MRangeWithLabelsReplyItem2 extends MRangeReplyItem2 {
  labels: Labels;
}

export default {
  FIRST_KEY_INDEX: undefined,
  IS_READ_ONLY: true,
  transformArguments: transformMRangeWithLabelsArguments.bind(undefined, 'TS.MRANGE'),
  transformReply: {
    2(reply: UnwrapReply<MRangeRawReply2>): Array<MRangeWithLabelsReplyItem2> {
      const args = [];
  
      for (const [key, labels, samples] of reply) {
        args.push({
          key,
          labels: transformLablesReply(labels),
          samples: transformSamplesReply(samples as unknown as UnwrapReply<ArrayReply<SampleRawReply2>>)
        });
      }
  
      return args;
    },
    3: undefined as unknown as () => ReplyUnion
  },
  unstableResp3Module: true
} as const satisfies Command;
