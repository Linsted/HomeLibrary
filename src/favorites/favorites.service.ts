import { Injectable } from '@nestjs/common';

/**
 *Class to connect to Favorites table and perform business logic
 */
@Injectable()
export class FavoritesService {
  /** Service name */
  SERVICE: string = FavoritesService.name;
}
