import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    let existingUser = null;

    try {
      existingUser = await this.usersRepository.findOne({
        where: {
          login: user.login,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve users from the database',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }

    let newUser = this.usersRepository.create(user);

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create new user', {
        description: 'Error connecting to the database',
      });
    }

    return newUser;
  }

  /** Find all Users */
  async findAll(): Promise<ICreateUser[]> {
    let users = null;

    try {
      users = await this.usersRepository.find({
        select: ['id', 'login'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve users from the database',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return users;
  }

  /** Find 1 User by ID */
  async findOne(id: string) {
    let user = null;

    try {
      user = await this.usersRepository.findOne({
        where: { id },
        select: ['id', 'login'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve user from the database',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /** Update password */
  async updatePassword(id: string, updatePasswordDto: IUpdatePassword) {
    let user = null;
    try {
      user = await this.usersRepository.findOne({
        where: { id },
        select: ['id', 'password'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve user from the database',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const isMatch = updatePasswordDto.oldPassword === user.password;
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    try {
      await this.usersRepository.update(id, {
        password: updatePasswordDto.newPassword,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update password in the database',
        {
          description: 'Error updating the password in the database',
        },
      );
    }

    return { id, message: 'Password updated successfully', status: 'success' };
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
