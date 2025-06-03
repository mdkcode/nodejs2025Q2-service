import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from './albums.repository';
import { TracksRepository } from 'src/tracks/tracks.repository';
import { FavoritesRepository } from 'src/favorites/favorites.repository';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepo: AlbumsRepository,
    @Inject(forwardRef(() => TracksRepository))
    private readonly tracksRepo: TracksRepository,
    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favsRepo: FavoritesRepository,
  ) {}
  create(createAlbumDto: CreateAlbumDto) {
    return this.albumsRepo.create(createAlbumDto);
  }

  findAll() {
    return this.albumsRepo.findAll();
  }

  findOne(id: string) {
    return this.albumsRepo.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumsRepo.update(id, updateAlbumDto);
  }

  remove(id: string) {
    this.albumsRepo.remove(id);
    this.tracksRepo.nullifyAlbum(id);
    this.favsRepo.removeIdFromFavorites('album', id);
  }
}
