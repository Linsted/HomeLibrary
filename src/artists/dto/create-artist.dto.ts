import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @Transform(() => uuidv4())
  id: string;

  @IsString()
  @IsNotEmpty()
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
