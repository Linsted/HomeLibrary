import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ArtistService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ARTIST_RESPONSE_SAMPLE } from 'src/common/constants/swagger';

/**Artist controller*/
@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  /**Get all artists*/
  @Get()
  @ApiResponse(ARTIST_RESPONSE_SAMPLE.GET_ALL)
  findAll() {
    return this.artistService.findAll();
  }

  /** Create artist */
  @Post()
  @ApiResponse(ARTIST_RESPONSE_SAMPLE.CREATE_ARTIST)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  /** Get one artist by id */
  @Get(':id')
  @ApiResponse(ARTIST_RESPONSE_SAMPLE.GET_ONE)
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  /** Update artist */
  @Patch(':id')
  @ApiResponse(ARTIST_RESPONSE_SAMPLE.UPDATE_ARTIST)
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  /** Delete artist */
  @Delete(':id')
  @ApiResponse(ARTIST_RESPONSE_SAMPLE.DELETE_ARTIST)
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
