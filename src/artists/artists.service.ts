import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsRepository } from './artists.repository';
import { TracksRepository } from 'src/tracks/tracks.repository';
import { AlbumsRepository } from 'src/albums/albums.repository';
import { FavoritesRepository } from 'src/favorites/favorites.repository';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistsRepo: ArtistsRepository,
    @Inject(forwardRef(() => TracksRepository))
    private readonly tracksRepo: TracksRepository,
    @Inject(forwardRef(() => AlbumsRepository))
    private readonly albumsRepo: AlbumsRepository,
    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favsRepo: FavoritesRepository,
  ) {}
  create(createArtistDto: CreateArtistDto) {
    return this.artistsRepo.create(createArtistDto);
  }

  findAll() {
    return this.artistsRepo.findAll();
  }

  findOne(id: string) {
    return this.artistsRepo.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistsRepo.update(id, updateArtistDto);
  }

  remove(id: string) {
    this.artistsRepo.remove(id);
    this.tracksRepo.nullifyArtist(id);
    this.albumsRepo.nullifyArtist(id);
    this.favsRepo.removeIdFromFavorites('artist', id);
  }
}
