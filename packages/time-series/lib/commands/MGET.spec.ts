import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import MGET from './MGET';

describe('TS.MGET', () => {
  describe('transformArguments', () => {
    it('without options', () => {
      assert.deepEqual(
        MGET.transformArguments('label=value'),
        ['TS.MGET', 'FILTER', 'label=value']
      );
    });

    it('with LATEST', () => {
      assert.deepEqual(
        MGET.transformArguments('label=value', {
          LATEST: true
        }),
        ['TS.MGET', 'LATEST', 'FILTER', 'label=value']
      );
    });
  });

  testUtils.testWithClient('client.ts.mGet', async client => {
    const [, reply] = await Promise.all([
      client.ts.add('key', 0, 0, {
        LABELS: { label: 'value' }
      }),
      client.ts.mGet('label=value')
    ]);

    assert.deepEqual(reply, [{
      key: 'key',
      sample: {
        timestamp: 0,
        value: 0
      }
    }]);
  }, GLOBAL.SERVERS.OPEN);
});
