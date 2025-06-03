import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { handleErrors } from 'src/errorHandling';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsRepository {
  private artists = [];

  create(artist: CreateArtistDto): Artist {
    if (!artist?.name || artist.grammy === undefined)
      throw new BadRequestException('Required fields are missing');
    const newArtist = {
      id: randomUUID(),
      ...artist,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    handleErrors(id, this.artists);
    const artist = this.artists.find((artist) => artist.id === id);
    return artist;
  }

  update(id: string, update: UpdateArtistDto): Artist {
    if (
      !(
        (typeof update?.name === 'string' && update.name.trim() !== '') ||
        typeof update?.grammy === 'boolean'
      )
    ) {
      throw new BadRequestException('At least one field is required to update');
    }

    handleErrors(id, this.artists);
    const artist = this.artists.find((artist) => artist.id === id);
    if (update.name) {
      artist.name = update.name;
    }

    if (update.grammy !== undefined) {
      artist.grammy = update.grammy;
    }

    return artist;
  }

  remove(id: string): void {
    handleErrors(id, this.artists);
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
  }
}
