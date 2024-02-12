import EventEmitter from 'events';
import { IUser } from '../utils/interfaces/User';
import { Errors } from '../utils/enums/errors';
import cluster from 'cluster';

const users: IUser[] = [];

export class UsersRepository extends EventEmitter {
  private async requestMasterData(obj): Promise<any> {
    return new Promise((resolve, reject) => {
      const result = process.send(obj, () => {
        this.once(obj.cmd, (msg) => {
          resolve(msg['data']);
        });
      });
      if (!result) {
        throw new Error(Errors.ERROR_UNEXPECTED);
      }
    });
  }

  public async find(): Promise<IUser[]> {
    if (cluster.isWorker) {
      const obj = { cmd: 'find', data: [] };
      return this.requestMasterData(obj);
    } else {
      return new Promise((res, rej) => {
        res(users);
      });
    }
  }

  public async findOne(id: string): Promise<IUser> {
    if (cluster.isWorker) {
      const obj = { cmd: 'findOne', data: [id] };
      return this.requestMasterData(obj);
    } else {
      return new Promise((res, rej) => {
        res(users.find((item) => item.id === id));
      });
    }
  }
}
