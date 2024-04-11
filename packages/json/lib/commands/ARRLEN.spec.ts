import { strict as assert } from 'node:assert';
import testUtils, { GLOBAL } from '../test-utils';
import ARRLEN from './ARRLEN';

describe('JSON.ARRLEN', () => {
  describe('transformArguments', () => {
    it('simple', () => {
      assert.deepEqual(
        ARRLEN.transformArguments('key'),
        ['JSON.ARRLEN', 'key']
      );
    });

    it('with path', () => {
      assert.deepEqual(
        ARRLEN.transformArguments('key', {
          path: '$'
        }),
        ['JSON.ARRLEN', 'key', '$']
      );
    });
  });

  testUtils.testWithClient('client.json.arrLen', async client => {
    const [, reply] = await Promise.all([
      client.json.set('key', '$', []),
      client.json.arrLen('key')
    ]);

    assert.equal(reply, 0);
  }, GLOBAL.SERVERS.OPEN);
});
