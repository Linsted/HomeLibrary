import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateArtistDto {
  @IsOptional()
  @IsUUID('4', { message: 'id must be a valid UUID' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    description: 'Name',
  })
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Has grammy?',
  })
  grammy: boolean;
}
