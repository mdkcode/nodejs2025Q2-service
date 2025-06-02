import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksRepository } from './tracks.repository';

@Injectable()
export class TracksService {
  constructor(private readonly tracksRepo: TracksRepository) {}
  create(createTrackDto: CreateTrackDto) {
    return this.tracksRepo.create(createTrackDto);
  }

  findAll() {
    return this.tracksRepo.findAll();
  }

  findOne(id: string) {
    return this.tracksRepo.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.tracksRepo.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.tracksRepo.remove(id);
  }
}
