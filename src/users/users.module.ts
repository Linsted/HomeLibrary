import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
@Module({
  controllers: [UsersController],
  providers: [UsersService, Logger],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
