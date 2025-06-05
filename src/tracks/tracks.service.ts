import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksRepository } from './tracks.repository';
import { FavoritesRepository } from 'src/favorites/favorites.repository';

@Injectable()
export class TracksService {
  constructor(
    private readonly tracksRepo: TracksRepository,
    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favsRepo: FavoritesRepository,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    return await this.tracksRepo.create(createTrackDto);
  }

  async findAll() {
    return await this.tracksRepo.findAll();
  }

  async findOne(id: string) {
    return await this.tracksRepo.findOne(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.tracksRepo.update(id, updateTrackDto);
  }

  async remove(id: string) {
    await this.favsRepo.removeIdFromFavorites('track', id);
    await this.tracksRepo.remove(id);
  }
}
