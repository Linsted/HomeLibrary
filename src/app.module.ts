import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ArtistModule } from './artist/artists.module';
import { Artist } from './artist/entities/artist.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Artist],
      synchronize: true,
      // synchronize: true - shouldn`t be use in prod.
    }),
    ArtistModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
