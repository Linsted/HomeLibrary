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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @ApiResponse({
    status: 200,
    description: 'List of users fetched successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
          },
          login: { type: 'string', example: 'user2' },
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Fetch a list of users',
  })
  findAll() {
    return this.userService.findAll();
  }

  /** Get one user by id */
  @Get(':id')
  @ApiOperation({
    summary: 'Fetch a user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'User exists',
  })
  @ApiParam({
    name: 'id',
    description: 'Get user with specific id',
    example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  /** Create user */
  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User 486bd5b8-be2a-4d72-890b-5bf97a9b1bf3 created',
        },
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /** Update user password */
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'User updated',
  })
  @ApiOperation({
    summary: 'Update user password',
  })
  @ApiParam({
    name: 'id',
    description: 'Get user with specific id',
    example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
  })
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  /** Delete user */
  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'User deleted',
  })
  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiParam({
    name: 'id',
    description: 'Get user with specific id',
    example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
  })
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.deleteUser(id);
  }
}
