import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from './artists.repository';
import { AlbumsRepository } from 'src/albums/albums.repository';
import { TracksRepository } from 'src/tracks/tracks.repository';
import { FavoritesRepository } from 'src/favorites/favorites.repository';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    ArtistsRepository,
    AlbumsRepository,
    TracksRepository,
    FavoritesRepository,
  ],
  exports: [ArtistsRepository],
})
export class ArtistsModule {}
