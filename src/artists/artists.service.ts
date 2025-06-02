import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsRepository } from './artists.repository';
import { TracksRepository } from 'src/tracks/tracks.repository';
import { AlbumsRepository } from 'src/albums/albums.repository';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistsRepo: ArtistsRepository,
    private readonly tracksRepo: TracksRepository,
    private readonly albumsRepo: AlbumsRepository,
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
    this.tracksRepo.nullifyArtist(id);
    this.albumsRepo.nullifyArtist(id);
    return this.artistsRepo.remove(id);
  }
}
