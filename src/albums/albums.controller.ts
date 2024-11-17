import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ALBUM_RESPONSE_SAMPLE } from 'src/common/constants/swagger';

/**Album controller*/
@Controller('album')
@ApiTags('Album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  /** Create album */
  @Post()
  @ApiResponse(ALBUM_RESPONSE_SAMPLE.CREATE_ALBUM)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  /**Get all albums*/
  @Get()
  @ApiResponse(ALBUM_RESPONSE_SAMPLE.GET_ALL)
  findAll() {
    return this.albumsService.findAll();
  }

  /**Get 1 album by ID*/
  @Get(':id')
  @ApiResponse(ALBUM_RESPONSE_SAMPLE.GET_ONE)
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }
}
