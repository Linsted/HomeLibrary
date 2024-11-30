import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artists/artists.module';
import { Artist } from './artists/entities/artist.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { Album } from './albums/entities/album.entity';
import { FavoritesModule } from './favorites/favorites.module';
import { Favorite } from './favorites/entities/favorite.entity';
import { AuthModule } from './auth/auth.module';
import { ENVIRONMENT } from './common/constants/general.constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Artist, Album, Favorite],
      synchronize: process.env.NODE_ENV === ENVIRONMENT.DEV,
    }),
    ArtistModule,
    AlbumsModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
