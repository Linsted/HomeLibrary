import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArtistService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(+id, updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistService.remove(+id);
  }
}
