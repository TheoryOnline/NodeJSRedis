import { strict as assert } from 'node:assert';
import testUtils, { GLOBAL } from '../test-utils';
import CLUSTER_REPLICAS from './CLUSTER_REPLICAS';

describe('CLUSTER REPLICAS', () => {
  it('transformArguments', () => {
    assert.deepEqual(
      CLUSTER_REPLICAS.transformArguments('0'),
      ['CLUSTER', 'REPLICAS', '0']
    );
  });

  testUtils.testWithCluster('clusterNode.clusterReplicas', async cluster => {
    const client = await cluster.nodeClient(cluster.masters[0]),
      reply = await client.clusterReplicas(cluster.masters[0].id);
    assert.ok(Array.isArray(reply));
    for (const replica of reply) {
      assert.equal(typeof replica, 'string');  
    }
  }, GLOBAL.CLUSTERS.OPEN);
});
