import { strict as assert } from 'node:assert';
import testUtils, { GLOBAL } from '../test-utils';
import RO_QUERY from './RO_QUERY';

describe('GRAPH.RO_QUERY', () => {
  it('transformArguments', () => {
    assert.deepEqual(
      RO_QUERY.transformArguments('key', 'query'),
      ['GRAPH.RO_QUERY', 'key', 'query']
    );
  });

  testUtils.testWithClient('client.graph.roQuery', async client => {
    const [, { data }] = await Promise.all([
      client.graph.query('key', 'RETURN 0'), // make sure to create a graph first
      client.graph.roQuery('key', 'RETURN 0')
    ]);
    assert.deepEqual(data, [[0]]);
  }, GLOBAL.SERVERS.OPEN);
});