import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { isValidUUID } from 'src/errorHandling';
import { TracksRepository } from 'src/tracks/tracks.repository';
import { AlbumsRepository } from 'src/albums/albums.repository';
import { ArtistsRepository } from 'src/artists/artists.repository';
import { repoType } from './entities/favorite.entity';

@Injectable()
export class FavoritesRepository {
  private favoriteTrackIds: string[] = [];
  private favoriteAlbumIds: string[] = [];
  private favoriteArtistIds: string[] = [];

  constructor(
    private tracksRepo: TracksRepository,
    private albumsRepo: AlbumsRepository,
    private artistsRepo: ArtistsRepository,
  ) {}

  getAll() {
    return {
      artists: this.favoriteArtistIds.map((id) => this.artistsRepo.findOne(id)),
      albums: this.favoriteAlbumIds.map((id) => this.albumsRepo.findOne(id)),
      tracks: this.favoriteTrackIds.map((id) => this.tracksRepo.findOne(id)),
    };
  }

  add(type: repoType, id: string) {
    if (!isValidUUID(id)) throw new BadRequestException('Invalid UUID');

    const repo = {
      track: this.tracksRepo,
      album: this.albumsRepo,
      artist: this.artistsRepo,
    }[type];

    const exists = repo.findOne(id);
    if (!exists) throw new UnprocessableEntityException(`${type} not found`);

    const list = this[`favorite${capitalize(type)}Ids`];
    if (!list.includes(id)) list.push(id);
  }

  remove(type: repoType, id: string) {
    if (!isValidUUID(id)) throw new BadRequestException('Invalid UUID');

    const list = this[`favorite${capitalize(type)}Ids`];
    const index = list.indexOf(id);
    if (index === -1) throw new NotFoundException(`${type} is not favorite`);

    list.splice(index, 1);
  }

  removeIdFromFavorites(type: repoType, id: string): void {
    const list = this[`favorite${capitalize(type)}Ids`] as string[];
    const index = list.indexOf(id);
    if (index !== -1) list.splice(index, 1);
  }
}

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
