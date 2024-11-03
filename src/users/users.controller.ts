import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { ICreateUser } from './interfaces/user.interface';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll(): ICreateUser[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.deleteUser(id);
  }
}
