import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { handleErrors, isValidUUID } from 'src/errorHandling';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsRepository {
  private albums = [];

  create(album: CreateAlbumDto): Album {
    if (!album?.name || !album?.year)
      throw new BadRequestException('Required fields are missing');
    const newAlbum = {
      id: randomUUID(),
      ...album,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    handleErrors(id, this.albums);
    const album = this.albums.find((album) => album.id === id);
    return album;
  }

  update(id: string, update: UpdateAlbumDto): Album {
    if (
      !(
        (typeof update?.name === 'string' && update.name.trim() !== '') ||
        Number.isInteger(update.year) ||
        (update.artistId && isValidUUID(update.artistId))
      )
    ) {
      throw new BadRequestException('At least one field is required to update');
    }

    handleErrors(id, this.albums);
    const album = this.albums.find((album) => album.id === id);
    if (update.name) {
      album.name = update.name;
    }

    if (update.year) {
      album.year = update.year;
    }

    if (update.artistId) {
      album.artistId = update.artistId;
    }

    return album;
  }

  remove(id: string): void {
    handleErrors(id, this.albums);
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(index, 1);
  }

  nullifyArtist(artistId: string): void {
    for (const album of this.albums) {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    }
  }
}
