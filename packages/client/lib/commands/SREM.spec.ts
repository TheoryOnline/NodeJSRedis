import { strict as assert } from 'node:assert';
import testUtils, { GLOBAL } from '../test-utils';
import SREM from './SREM';

describe('SREM', () => {
  describe('transformArguments', () => {
    it('string', () => {
      assert.deepEqual(
        SREM.transformArguments('key', 'member'),
        ['SREM', 'key', 'member']
      );
    });

    it('array', () => {
      assert.deepEqual(
        SREM.transformArguments('key', ['1', '2']),
        ['SREM', 'key', '1', '2']
      );
    });
  });

  testUtils.testAll('sRem', async client => {
    assert.equal(
      await client.sRem('key', 'member'),
      0
    );
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.CLUSTERS.OPEN
  });
});
