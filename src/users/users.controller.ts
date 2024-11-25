import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CONTROLLER_TAGS,
  USER_RESPONSE_SAMPLE,
} from 'src/common/constants/swagger';

import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('/user')
@ApiTags(CONTROLLER_TAGS.USERS)
export class UsersController {
  constructor(private userService: UsersService) {}

  /**Get all users*/
  @Get()
  @ApiResponse(USER_RESPONSE_SAMPLE.GET_ALL_USERS)
  findAll() {
    return this.userService.findAll();
  }

  /** Get one user by id */
  @Get(':id')
  @ApiResponse(USER_RESPONSE_SAMPLE.GET_ONE_USER)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  /** Create user */
  @Post()
  @ApiResponse(USER_RESPONSE_SAMPLE.CREATE_USER)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /** Update user password */
  @Patch(':id')
  @ApiResponse(USER_RESPONSE_SAMPLE.UPDATE_USER_PASSWORD)
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  /** Delete user */
  @Delete(':id')
  @ApiResponse(USER_RESPONSE_SAMPLE.DELETE_USER)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.deleteUser(id);
  }
}
