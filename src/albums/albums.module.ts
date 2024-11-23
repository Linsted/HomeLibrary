import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Album } from './entities/album.entity';
import { ArtistModule } from 'src/artists/artists.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, Logger],
  imports: [TypeOrmModule.forFeature([Album]), ArtistModule],
  exports: [AlbumsService],
})
export class AlbumsModule {}
