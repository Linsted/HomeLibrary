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
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  USER_PARAMS_SAMPLE,
  USER_RESPONSE_SAMPLE,
} from 'src/common/constants/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { ICreateUser } from './interfaces/user.interface';

@Controller('user')
@ApiTags('Users')
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
  @ApiParam(USER_PARAMS_SAMPLE.GET_ONE_USER)
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
  @Put(':id')
  @ApiResponse(USER_RESPONSE_SAMPLE.UPDATE_USER_PASSWORD)
  @ApiParam(USER_PARAMS_SAMPLE.UPDATE_USER_PASSWORD)
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  /** Delete user */
  @Delete(':id')
  @ApiResponse(USER_RESPONSE_SAMPLE.DELETE_USER)
  @ApiParam(USER_PARAMS_SAMPLE.DELETE_USER)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.deleteUser(id);
  }
}
