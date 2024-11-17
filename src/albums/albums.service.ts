import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { ArtistService } from 'src/artists/artists.service';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  /** Service name */
  SERVICE: string = AlbumsService.name;

  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    private readonly artistService: ArtistService,
    private readonly logger: Logger,
  ) {}

  /** Create album */
  async create(createAlbumDto: CreateAlbumDto) {
    let artist = null;

    if (createAlbumDto.artistId)
      artist = await this.artistService.findOne(createAlbumDto.artistId);

    const albumData = artist ? { ...createAlbumDto, artist } : createAlbumDto;

    let album = this.albumRepository.create(albumData);

    try {
      album = await this.albumRepository.save(album);
    } catch (error) {
      this.logger.error(
        'Failed to create new album',
        error.stack,
        this.SERVICE,
      );
      throw new InternalServerErrorException('Failed to create new album');
    }

    return album;
  }

  /** Ge all albums */
  async findAll() {
    try {
      return await this.albumRepository.find({
        relations: ['artist'],
        select: ['id', 'name', 'year'],
      });
    } catch (error) {
      this.logger.error(
        'Failed to retrieve albums from the database',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve albums from the database',
      );
    }
  }

  async findOne(id: string) {
    let album = null;

    try {
      album = await this.albumRepository.findOne({
        where: { id },
        select: ['id', 'name', 'year'],
        relations: ['artist'],
      });
    } catch (error) {
      this.logger.error(
        'Failed to retrieve album from the database',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve album from the database',
      );
    }

    if (!album) {
      throw new NotFoundException('Album not found!');
    }

    return album;
  }
}
