import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Album } from 'src/albums/entities/album.entity';
@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'boolean',
  })
  grammy: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @ManyToMany(() => Favorite, (favorite) => favorite.artists, {
    onDelete: 'CASCADE',
  })
  favorite: Favorite[];
}
