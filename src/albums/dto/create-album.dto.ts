import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateAlbumDto {
  @Transform(() => uuidv4())
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    description: 'Album name',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Album year',
  })
  year: number;

  @IsOptional()
  @IsUUID('4', { message: 'artistId must be a valid UUID' })
  artistId: string | null;
}
