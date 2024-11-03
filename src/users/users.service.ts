import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ICreateUser, IUpdatePassword } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: ICreateUser[] = [];

  create(user: ICreateUser) {
    this.users.push({ ...user, id: uuidv4() });
  }

  findAll(): ICreateUser[] {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user: ICreateUser) => id === user.id);
  }

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

  deleteUser(id: string) {
    const user = this.findOne(id);
    if (!user) {
      throw new HttpException('User doesn`t exist', HttpStatus.NOT_FOUND);
    }

    this.users = this.users.filter((user) => user.id !== id);

    return `User ${id} deleted`;
  }
}
