import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { handleErrors, isValidUUID } from 'src/errorHandling';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksRepository {
  private tracks = [];

  create(track: CreateTrackDto): Track {
    if (!track?.name || !track.duration)
      throw new BadRequestException('Required fields are missing');
    const newTrack = {
      id: randomUUID(),
      ...track,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    handleErrors(id, this.tracks);
    const track = this.tracks.find((track) => track.id === id);
    return track;
  }

  update(id: string, update: UpdateTrackDto): Track {
    if (
      !(
        (typeof update?.name === 'string' && update.name.trim() !== '') ||
        (typeof update?.duration === 'number' &&
          Number.isInteger(update.duration) &&
          update.duration > 0) ||
        (typeof update?.artistId === 'string' &&
          isValidUUID(update.artistId)) ||
        (typeof update?.albumId === 'string' && isValidUUID(update.albumId))
      )
    ) {
      throw new BadRequestException('At least one field is required to update');
    }

    handleErrors(id, this.tracks);
    const track = this.tracks.find((track) => track.id === id);
    if (update.name) {
      track.name = update.name;
    }

    if (update.artistId) {
      track.artistId = update.artistId;
    }

    if (update.albumId) {
      track.albumId = update.albumId;
    }

    if (update.duration) {
      track.duration = update.duration;
    }
    return track;
  }

  remove(id: string): void {
    handleErrors(id, this.tracks);
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(index, 1);
  }
}
