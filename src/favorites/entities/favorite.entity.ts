import { Entity } from 'typeorm';

/** Favorite entity */
@Entity()
export class Favorite {
  artists: string[];
  albums: string[];
}
