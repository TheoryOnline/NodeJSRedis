import { strict as assert } from 'node:assert';
import testUtils, { GLOBAL } from '../test-utils';
import SCARD from './SCARD';

describe('SCARD', () => {
  it('transformArguments', () => {
    assert.deepEqual(
      SCARD.transformArguments('key'),
      ['SCARD', 'key']
    );
  });

  testUtils.testAll('sCard', async client => {
    assert.equal(
      await client.sCard('key'),
      0
    );
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.CLUSTERS.OPEN
  });
});
