import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  /** Service name */
  SERVICE: string = ArtistService.name;

  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    private readonly logger: Logger,
  ) {}

  /** Create artist */
  async create(createArtistDto: CreateArtistDto) {
    let newArtist = this.artistRepository.create(createArtistDto);

    try {
      newArtist = await this.artistRepository.save(newArtist);
    } catch (error) {
      this.logger.error(
        'Failed to create new artist',
        error.stack,
        this.SERVICE,
      );
      throw new InternalServerErrorException('Failed to create new artist');
    }

    return newArtist;
  }

  /** Get all artists */
  async findAll() {
    let artists: CreateArtistDto[];

    try {
      artists = await this.artistRepository.find({
        select: ['id', 'name', 'grammy'],
      });
    } catch (error) {
      this.logger.error(
        'Failed to retrieve artists from the database',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve artists from the database',
      );
    }

    return artists;
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
