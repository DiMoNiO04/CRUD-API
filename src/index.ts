import { Cluster } from './app/Cluster';
import { isCluster } from './utils/functions/isCluster';

const cluster = new Cluster();

const start = (): void => {
  if (isCluster()) {
    cluster.actionWithCluster();
  } else {
    cluster.actionWithoutCluster();
  }
};

start();
