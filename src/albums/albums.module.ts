import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository],
  imports: [forwardRef(() => FavoritesModule), forwardRef(() => TracksModule)],
  exports: [AlbumsRepository],
})
export class AlbumsModule {}
