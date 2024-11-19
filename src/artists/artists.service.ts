import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

/**
 *Class to connect to Artist table and perform business logic
 */
@Injectable()
export class ArtistService {
  /** Service name */
  SERVICE: string = ArtistService.name;

  constructor(
    /**Injecting Users repository and logger */
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

  /** Get one artist by ID  */
  async findOne(id: string) {
    let artist: CreateArtistDto;

    try {
      artist = await this.artistRepository.findOne({
        where: { id },
        select: ['id', 'name', 'grammy'],
      });
    } catch (error) {
      this.logger.error(
        'Failed to retrieve artist from the database',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve artist from the database',
      );
    }

    if (!artist) {
      throw new NotFoundException('Artist not found!');
    }

    return artist;
  }

  /** Update artist */
  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    try {
      const updatedArtist = await this.artistRepository.save({
        id: artist.id,
        ...updateArtistDto,
      });
      return updatedArtist;
    } catch (error) {
      this.logger.error(
        'Failed to update artist in the database',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to update artist in the database',
      );
    }
  }

  /** Delete artist */
  async remove(id: string) {
    const artist = await this.findOne(id);

    try {
      await this.artistRepository.delete(artist?.id);
    } catch (error) {
      this.logger.error(
        'Failed to delete artist in the database',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to delete artist in the database',
      );
    }

    return { message: `Artist ${artist?.name} deleted` };
  }
}
