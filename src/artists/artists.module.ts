import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from './artists.repository';
import { AlbumsRepository } from 'src/albums/albums.repository';
import { TracksRepository } from 'src/tracks/tracks.repository';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    ArtistsRepository,
    AlbumsRepository,
    TracksRepository,
  ],
})
export class ArtistsModule {}
