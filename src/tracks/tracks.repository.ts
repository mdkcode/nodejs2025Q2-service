import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isValidUUID } from 'src/errorHandling';

@Injectable()
export class TracksRepository {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepo: Repository<Track>,
  ) {}

  async create(trackDto: CreateTrackDto): Promise<Track> {
    if (!trackDto.name || !trackDto.duration)
      throw new BadRequestException('Required fields are missing');
    const track = this.trackRepo.create(trackDto);
    return await this.trackRepo.save(track);
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepo.find();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.trackRepo.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    if (!isValidUUID(id)) {
      throw new BadRequestException(`Invalid UUID: ${id}`);
    }
    return track;
  }

  async update(id: string, updateDto: UpdateTrackDto): Promise<Track> {
    if (!isValidUUID(id)) {
      throw new BadRequestException(`Invalid UUID: ${id}`);
    }
    const track = await this.findOne(id); // throws if not found

    const updatedTrack = {
      ...track,
      ...updateDto,
    };

    return await this.trackRepo.save(updatedTrack);
  }

  async remove(id: string): Promise<void> {
    if (!isValidUUID(id)) {
      throw new BadRequestException(`Invalid UUID: ${id}`);
    }
    const result = await this.trackRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
  }

  async nullifyArtist(artistId: string): Promise<void> {
    await this.trackRepo
      .createQueryBuilder()
      .update(Track)
      .set({ artistId: null })
      .where('artistId = :artistId', { artistId })
      .execute();
  }

  async nullifyAlbum(albumId: string): Promise<void> {
    await this.trackRepo
      .createQueryBuilder()
      .update(Track)
      .set({ albumId: null })
      .where('albumId = :albumId', { albumId })
      .execute();
  }
}
