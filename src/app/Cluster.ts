import http from 'http';
import cluster from 'cluster';
import os from 'os';
import { getPort } from '../utils/functions/getPort';
import { Routes, userRepository } from './Router';

const router = new Routes();
export const app = http.createServer(router.handleRequest);

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
      if (mes.cmd in userRepository) {
        const data = await userRepository[mes.cmd](...mes.data);
        worker.send({ cmd: mes.cmd, data });
      }
    });
  }

  private receiveMsgFromMainProccess(): void {
    process.on('message', (mes) => {
      userRepository.emit(mes['cmd'], mes);
    });
  }

  private startServer(): void {
    app.listen(this.PORT, () => {
      console.log(`Worker ${this.pid} server running at http://localhost:${this.PORT}/`);
    });
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
    app.listen(this.PORT, () => {
      console.log(`Server running at http://localhost:${this.PORT}/`);
    });
  }
}
