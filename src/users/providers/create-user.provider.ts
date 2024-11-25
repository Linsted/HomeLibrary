import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HashingProvider } from 'src/auth/providers/hashing.provider';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserProvider {
  /** Service name */
  SERVICE: string = CreateUserProvider.name;

  constructor(
    /**Injecting Users repository and logger */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly logger: Logger,

    /**Injecting circular dependency HashingProvider  */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
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

    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      this.logger.error('Failed to create new user', error.stack, this.SERVICE);
      throw new InternalServerErrorException('Failed to create new user');
    }

    const { password, ...newUserWithoutPassword } = newUser;

    return newUserWithoutPassword;
  }
}
