import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';

/** Favorites model */
@Module({
  controllers: [FavoritesController],
})
export class FavoritesModule {}
