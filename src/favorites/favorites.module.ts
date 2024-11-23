import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';

/** Favorites model */
@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, Logger],
  imports: [TypeOrmModule.forFeature([Favorite]), ArtistModule, AlbumsModule],
})
export class FavoritesModule {}
