import * as uuid from 'uuid';
import { Errors } from '../utils/enums/errors';
import { ErrorNotFound, ErrorValidation } from '../utils/errors/error';
import { IUser } from '../utils/interfaces/User';
import { UsersRepository } from './repository';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async findAll(): Promise<IUser[]> {
    return this.usersRepository.find();
  }

  public async findOne(id: string): Promise<IUser> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new ErrorNotFound(Errors.ERROR_USER_NOT_FOUND);
    }

    return user;
  }

  public validateUserId(id: string): void {
    if (!uuid.validate(id)) {
      throw new ErrorValidation(Errors.ERROR_USERID_INVALID);
    }
  }
}
