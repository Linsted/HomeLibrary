import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  login: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  password: string;
}
