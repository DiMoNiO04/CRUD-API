import cluster from 'cluster';
import os from 'os';
import { getPort } from '../utils/functions/getPort';

export class Cluster {
  private pid: number = process.pid;
  private PORT: number = getPort();
  private cpus: number = os.cpus().length;

  private forkClusters(): void {
    for (let index = 0; index < this.cpus; index++) {
      cluster.fork();
    }
  }

  private exitClusters(): void {
    cluster.on('exit', (worker, code, signal) => {
      const pid = worker.process.pid;
      console.log(`Worker ${pid} died!`);
    });
  }

  private messageClusters(): void {
    cluster.on('message', async (worker, mes) => {
      // user cmd rep
    });
  }

  private receiveMsgFromMainProccess(): void {
    process.on('message', (mes) => {
      // emit user repositiry
    });
  }

  private startServer(): void {
    // start server listen
    console.log(`Worker ${this.pid} server running at http://localhost:${this.PORT}/`);
  }

  public actionWithCluster(): void {
    if (cluster.isPrimary) {
      console.log(`Primary process is started! CPU cores: ${this.pid}`);

      this.forkClusters();
      this.exitClusters();
      this.messageClusters();
    } else if (cluster.isWorker) {
      this.startServer();
      this.receiveMsgFromMainProccess();
    }
  }

  public actionWithoutCluster(): void {
    console.log(`Server running at http://localhost:${this.PORT}/`);
  }
}
