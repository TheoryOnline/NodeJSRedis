import { strict as assert } from 'node:assert';
import testUtils, { GLOBAL } from '../../test-utils';
import COUNT from './COUNT';

describe('TOPK.COUNT', () => {
  it('transformArguments', () => {
    assert.deepEqual(
      COUNT.transformArguments('key', 'item'),
      ['TOPK.COUNT', 'key', 'item']
    );
  });

  testUtils.testWithClient('client.topK.count', async client => {
    const [, reply] = await Promise.all([
      client.topK.reserve('key', 3),
      client.topK.count('key', 'item')
    ]);

    assert.deepEqual(reply, [0]);
  }, GLOBAL.SERVERS.OPEN);
});
