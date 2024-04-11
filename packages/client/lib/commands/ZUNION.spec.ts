import { strict as assert } from 'node:assert';
import testUtils, { GLOBAL } from '../test-utils';
import ZUNION from './ZUNION';

describe('ZUNION', () => {
  testUtils.isVersionGreaterThanHook([6, 2]);

  describe('transformArguments', () => {
    it('key (string)', () => {
      assert.deepEqual(
        ZUNION.transformArguments('key'),
        ['ZUNION', '1', 'key']
      );
    });

    it('keys (Array<string>)', () => {
      assert.deepEqual(
        ZUNION.transformArguments(['1', '2']),
        ['ZUNION', '2', '1', '2']
      );
    });

    it('key & weight', () => {
      assert.deepEqual(
        ZUNION.transformArguments({
          key: 'key',
          weight: 1
        }),
        ['ZUNION', '1', 'key', 'WEIGHTS', '1']
      );
    });

    it('keys & weights', () => {
      assert.deepEqual(
        ZUNION.transformArguments([{
          key: 'a',
          weight: 1
        }, {
          key: 'b',
          weight: 2
        }]),
        ['ZUNION', '2', 'a', 'b', 'WEIGHTS', '1', '2']
      );
    });

    it('with AGGREGATE', () => {
      assert.deepEqual(
        ZUNION.transformArguments('key', {
          AGGREGATE: 'SUM'
        }),
        ['ZUNION', '1', 'key', 'AGGREGATE', 'SUM']
      );
    });
  });

  testUtils.testAll('zUnion', async client => {
    assert.deepEqual(
      await client.zUnion('key'),
      []
    );
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.CLUSTERS.OPEN
  });
});
