import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksRepository } from './tracks.repository';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  imports: [
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([Track]),
  ],

  exports: [TracksRepository],
})
export class TracksModule {}
