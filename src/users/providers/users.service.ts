import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../entities/user.entity';
import { CreateUserProvider } from './create-user.provider';

/**
 *Class to connect to Users table and perform business logic
 */
@Injectable()
export class UsersService {
  /** Service name */
  SERVICE: string = UsersService.name;

  constructor(
    /**Injecting Users repository and logger */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly logger: Logger,
    private readonly createUserProvider: CreateUserProvider,
  ) {}

  /** Create user */
  create(createUserDto: CreateUserDto) {
    return this.createUserProvider.create(createUserDto);
  }

  /** Find all Users */
  async findAll() {
    let users: Pick<CreateUserDto, 'id' | 'login'>[];

    try {
      users = await this.usersRepository.find({
        select: ['id', 'login'],
      });
    } catch (error) {
      this.logger.error(
        'Failed to retrieve users from the database',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve users from the database',
      );
    }

    return users;
  }

  /** Find 1 User by ID */
  async findOne(id: string) {
    let user: Pick<CreateUserDto, 'id' | 'login'>;

    try {
      user = await this.usersRepository.findOne({
        where: { id },
        select: ['id', 'login'],
      });
    } catch (error) {
      this.logger.error(
        'Failed to retrieve user from the database',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve user from the database',
      );
    }

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /** Update password */
  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    let user = null;
    try {
      user = await this.usersRepository.findOne({
        where: { id },
        select: ['id', 'password'],
      });
    } catch (error) {
      this.logger.error(
        'Failed to retrieve user from the database',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve user from the database',
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
      this.logger.error(
        'Failed to update password in the database',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to update password in the database',
      );
    }

    return { id, message: 'Password updated successfully', status: 'success' };
  }

  /** Delete user */
  async deleteUser(id: string) {
    const user = await this.findOne(id);

    try {
      await this.usersRepository.softDelete(user?.id);
    } catch (error) {
      this.logger.error('Failed to delete user in the database', this.SERVICE);
      throw new InternalServerErrorException(
        'Failed to delete user in the database',
      );
    }

    return { message: `User ${user?.login} deleted` };
  }

  /** Find user by login */
  async findOneByLogin(login: string) {
    let user: User | null = null;

    try {
      user = await this.usersRepository.findOne({
        where: { login },
        select: ['id', 'login', 'password'],
      });
    } catch (error) {
      this.logger.error(
        'Failed to retrieve user from the database',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve user from the database',
      );
    }

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
