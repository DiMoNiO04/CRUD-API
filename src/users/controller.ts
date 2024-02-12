import { IUser } from '../utils/interfaces/User';
import { UsersService } from './service';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  public async findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  public async findOne(id: string): Promise<IUser> {
    this.usersService.validateUserId(id);
    return this.usersService.findOne(id);
  }
}
