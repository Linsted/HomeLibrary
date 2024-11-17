import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistController } from './artists.controller';
import { ArtistService } from './artists.service';
import { Artist } from './entities/artist.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, Logger],
  imports: [TypeOrmModule.forFeature([Artist])],
  exports: [ArtistService],
})
export class ArtistModule {}
