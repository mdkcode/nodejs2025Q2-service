import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from './artists.repository';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsRepository],
  exports: [ArtistsRepository],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([Artist]),
  ],
})
export class ArtistsModule {}
