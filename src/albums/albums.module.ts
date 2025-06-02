import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { TracksRepository } from 'src/tracks/tracks.repository';
import { FavoritesRepository } from 'src/favorites/favorites.repository';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    AlbumsRepository,
    TracksRepository,
    FavoritesRepository,
  ],
})
export class AlbumsModule {}
