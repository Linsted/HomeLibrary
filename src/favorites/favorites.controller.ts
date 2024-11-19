import { Controller, Delete, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CONTROLLER_TAGS } from 'src/common/constants/swagger';

/** Favorites controller */
@Controller('/favs')
@ApiTags(CONTROLLER_TAGS.FAVORITES)
export class FavoritesController {
  /** Add artist to favorites */
  @Post('/artist')
  addArtist() {
    return 'Test';
  }

  /** Delete artist from favorites */
  @Delete('/artist')
  deleteArtist() {}

  /** Add albums to favorites */
  @Post('/album')
  addAlbum() {}

  /** Delete albums from favorites */
  @Delete('/album')
  deleteAlbum() {}
}
