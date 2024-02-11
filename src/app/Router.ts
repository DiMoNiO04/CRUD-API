import { IncomingMessage, ServerResponse } from 'http';
import { METHOD } from '../utils/enums/methods';
import { STATUS_CODE } from '../utils/enums/status';

export class Routes {
  private pid: number = process.pid;

  private setHeader(res: ServerResponse): void {
    res.setHeader('Content-Type', 'application/json');
  }

  private getArgs(req: IncomingMessage): string[] {
    return req.url.split('/').filter(Boolean);
  }

  private isValidRequest(api: string, users: string, rest: string[]): boolean {
    return `${api}/${users}` === 'api/users' && !rest.length;
  }

  private async getBody(req: IncomingMessage): Promise<string> {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    return Buffer.concat(buffers).toString();
  }

  public async handleRequest(req: IncomingMessage, res: ServerResponse) {
    console.log(`Worker ${this.pid} requested`);
    this.setHeader(res);

    const [api, users, id, ...rest] = this.getArgs(req);
    console.log('api:', api, 'users:', users, 'id:', id, 'rest:', rest);

    const body: string = await this.getBody(req);

    if (this.isValidRequest(api, users, rest)) {
      this.handleUserRequest(req, res, id, body);
    } else {
      this.handleInvalidRequest(res);
    }
  }

  public async handleUserRequest(req: IncomingMessage, res: ServerResponse, id: string, body: string) {
    let result;
    const statusCode = STATUS_CODE.OK;

    try {
      switch (req.method) {
        case METHOD.GET: {
          break;
        }
        case METHOD.POST: {
          break;
        }
        case METHOD.PUT: {
          break;
        }
        case METHOD.DELETE: {
          break;
        }
        default: {
        }
      }
    } catch (err) {
      this.handleError(err, res);
    }

    res.writeHead(statusCode);
    res.end(JSON.stringify(result));
  }

  handleInvalidRequest(res: ServerResponse) {}

  handleError(err: unknown, res: ServerResponse) {}
}
