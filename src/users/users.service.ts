import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

/**
 *Class to connect to Users table and perform business logic
 */
@Injectable()
export class UsersService {
  /** Service name */
  SERVICE: string = UsersService.name;

  constructor(
    /**Injecting Users repository */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly logger: Logger,
  ) {}

  /** Create user */
  async create(createUserDto: CreateUserDto) {
    let existingUser = null;

    try {
      existingUser = await this.usersRepository.findOne({
        where: {
          login: createUserDto.login,
        },
        withDeleted: true,
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

    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }

    let newUser = this.usersRepository.create(createUserDto);

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      this.logger.error('Failed to create new user', error.stack, this.SERVICE);
      throw new InternalServerErrorException('Failed to create new user');
    }

    const { password, ...newUserWithoutPassword } = newUser;

    return newUserWithoutPassword;
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
    let user = null;

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
}
