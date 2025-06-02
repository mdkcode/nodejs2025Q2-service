import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { TracksRepository } from 'src/tracks/tracks.repository';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository, TracksRepository],
})
export class AlbumsModule {}
