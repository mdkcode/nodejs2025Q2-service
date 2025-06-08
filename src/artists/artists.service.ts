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

  async create(dto: CreateArtistDto) {
    return await this.artistsRepo.create(dto);
  }

  async findAll() {
    return await this.artistsRepo.findAll();
  }

  async findOne(id: string) {
    return await this.artistsRepo.findOne(id);
  }

  async update(id: string, dto: UpdateArtistDto) {
    return await this.artistsRepo.update(id, dto);
  }

  async remove(id: string) {
    await this.artistsRepo.remove(id);
    await this.tracksRepo.nullifyArtist(id);
    await this.albumsRepo.nullifyArtist(id);
    await this.favsRepo.removeIdFromFavorites('artist', id);
  }
}
