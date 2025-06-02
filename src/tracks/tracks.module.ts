import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksRepository } from './tracks.repository';
import { FavoritesRepository } from 'src/favorites/favorites.repository';
import { AlbumsRepository } from 'src/albums/albums.repository';
import { ArtistsRepository } from 'src/artists/artists.repository';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    TracksRepository,
    FavoritesRepository,
    AlbumsRepository,
    ArtistsRepository,
  ],
})
export class TracksModule {}
