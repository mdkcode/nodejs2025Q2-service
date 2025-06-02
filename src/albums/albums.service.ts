import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from './albums.repository';
import { TracksRepository } from 'src/tracks/tracks.repository';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepo: AlbumsRepository,
    private readonly tracksRepo: TracksRepository,
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
    this.tracksRepo.nullifyAlbum(id);
    return this.albumsRepo.remove(id);
  }
}
