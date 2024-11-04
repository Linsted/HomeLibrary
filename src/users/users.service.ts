import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ICreateUser, IUpdatePassword } from './interfaces/user.interface';

/**
 *Class to connect to Users table and perform business logic
 */
@Injectable()
export class UsersService {
  /** Users array */
  private users: ICreateUser[] = [];

  /** Create user */
  create(user: ICreateUser) {
    this.users.push({ ...user, id: uuidv4() });
    return { message: `User ${user.login} created` };
  }

  /** Find all Users */
  findAll(): ICreateUser[] {
    return this.users;
  }

  /** Find 1 User by ID */
  findOne(id: string) {
    return this.users.find((user: ICreateUser) => id === user.id);
  }

  /** Update password */
  updatePassword(id: string, updatePasswordDto: IUpdatePassword) {
    const user = this.findOne(id);
    if (!user) {
      throw new HttpException('User doesn`t exist', HttpStatus.NOT_FOUND);
    }

    const isMatch = updatePasswordDto.oldPassword === user.password;

    if (!isMatch) {
      throw new HttpException('Incorrect password', HttpStatus.FORBIDDEN);
    }

    this.users = this.users.map((user) =>
      user.id === id
        ? { ...user, password: updatePasswordDto.newPassword }
        : user,
    );

    return { id, message: 'Password updated successfully' };
  }

  /** Delete user */
  deleteUser(id: string) {
    const user = this.findOne(id);
    if (!user) {
      throw new HttpException('User doesn`t exist', HttpStatus.NOT_FOUND);
    }

    this.users = this.users.filter((user) => user.id !== id);

    return `User ${id} deleted`;
  }
}
