import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksRepository } from './tracks.repository';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  imports: [forwardRef(() => FavoritesModule)],
  exports: [TracksRepository],
})
export class TracksModule {}
