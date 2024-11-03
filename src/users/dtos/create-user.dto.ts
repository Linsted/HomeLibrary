import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @Transform(() => uuidv4())
  id: string;

  @ApiProperty({
    description: 'User login',
    example: 'userLogin',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  password: string;
}
