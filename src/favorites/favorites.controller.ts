import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CONTROLLER_TAGS } from 'src/common/constants/swagger';
import { FavoritesService } from './favorites.service';

/** Favorites controller */
@Controller('/favs')
@ApiTags(CONTROLLER_TAGS.FAVORITES)
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  /** Get all favorites */
  @Get()
  getAll() {
    return this.favoritesService.getFavorites();
  }

  /** Add artist to favorites */
  @Post('/artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addArtist(id);
  }

  /** Delete artist from favorites */
  @Delete('/artist/:id')
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteArtist(id);
  }

  /** Add albums to favorites */
  @Post('/album')
  addAlbum() {}

  /** Delete albums from favorites */
  @Delete('/album')
  deleteAlbum() {}
}
