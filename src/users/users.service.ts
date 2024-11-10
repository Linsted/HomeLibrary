import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateUser, IUpdatePassword } from './interfaces/user.interface';
import { User } from './user.entity';

/**
 *Class to connect to Users table and perform business logic
 */
@Injectable()
export class UsersService {
  /** Users array */
  private users: ICreateUser[] = [];

  constructor(
    /**Injecting Users repository */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /** Create user */
  async create(user: ICreateUser) {
    const existingUser = await this.usersRepository.findOne({
      where: {
        login: user.login,
      },
    });

    let newUser = this.usersRepository.create(user);
    newUser = await this.usersRepository.save(newUser);

    return newUser;
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
