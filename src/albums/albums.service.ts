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

  async create(dto: CreateAlbumDto) {
    return await this.albumsRepo.create(dto);
  }

  async findAll() {
    return await this.albumsRepo.findAll();
  }

  async findOne(id: string) {
    return await this.albumsRepo.findOne(id);
  }

  async update(id: string, dto: UpdateAlbumDto) {
    return await this.albumsRepo.update(id, dto);
  }

  async remove(id: string) {
    await this.albumsRepo.remove(id);
    await this.tracksRepo.nullifyAlbum(id);
    await this.favsRepo.removeIdFromFavorites('album', id);
  }
}
