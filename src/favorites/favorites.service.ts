import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ArtistService } from 'src/artists/artists.service';

import { Favorite } from './entities/favorite.entity';

/**
 *Class to connect to Favorites table and perform business logic
 */
@Injectable()
export class FavoritesService {
  /** Service name */
  SERVICE: string = FavoritesService.name;

  constructor(
    /**Injecting Favorites repository, Artist service and logger */
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly artistService: ArtistService,
    private readonly logger: Logger,
  ) {}

  /** Get all favorites */
  async getFavorites() {
    try {
      const favorites = await this.favoriteRepository.find({
        relations: ['artists', 'albums'],
      });
      return favorites[0] || { artists: [], albums: [] };
    } catch (error) {
      this.logger.error(
        'Failed to retrieve favorites from the database',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve favorites from the database',
      );
    }
  }

  /** Add artist to favorites */
  async addArtist(id: string) {
    const favorites = await this.getFavorites();

    const artist = await this.artistService.findOne(id);

    if (favorites.artists.some((artist) => artist.id === id)) {
      throw new BadRequestException('Artist already in favorites');
    }

    favorites.artists.push(artist);

    try {
      await this.favoriteRepository.save(favorites);

      return { message: 'Artist added to favs', artist };
    } catch (error) {
      this.logger.error(
        'Failed to add new artist to the favorites',
        this.SERVICE,
      );
      throw new InternalServerErrorException(
        'Failed to add new artist to the favorites',
      );
    }
  }

  /** Delete artist from favorites */
  async deleteArtist(id: string) {
    let favorites = await this.getFavorites();

    if (!favorites.artists.some((el) => el.id === id)) {
      throw new NotFoundException(`Artist ${id} not in favs!`);
    }

    favorites.artists = favorites.artists.filter((artist) => artist.id !== id);

    try {
      await this.favoriteRepository.save(favorites);

      return { message: `Artist ${id} deleted successfully` };
    } catch (error) {
      this.logger.error('Failed to delete user from favorites', this.SERVICE);
      throw new InternalServerErrorException(
        'Failed to delete user from favorites',
      );
    }
  }
}
