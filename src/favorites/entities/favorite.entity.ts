import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';

/** Favorite entity */
@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Artist, (artist) => artist.favorite, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'favorite_artists',
    joinColumn: { name: 'favorites_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'artist_id', referencedColumnName: 'id' },
  })
  artists: Artist[];

  @ManyToMany(() => Album, (album) => album.favorite, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'favorite_albums',
    joinColumn: { name: 'favorites_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'album_id', referencedColumnName: 'id' },
  })
  albums: Album[];
}
