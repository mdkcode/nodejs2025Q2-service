import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { isValidUUID } from 'src/errorHandling';

@Injectable()
export class ArtistsRepository {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,
  ) {}

  async create(dto: CreateArtistDto): Promise<Artist> {
    if (!dto.name || dto.grammy === undefined) {
      throw new BadRequestException('Required fields are missing');
    }
    const artist = this.artistRepo.create(dto);
    return await this.artistRepo.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepo.find();
  }

  async findOne(id: string): Promise<Artist> {
    if (!isValidUUID(id)) {
      throw new BadRequestException(`Invalid UUID: ${id}`);
    }
    const artist = await this.artistRepo.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);

    if (
      !(
        (typeof dto?.name === 'string' && dto.name.trim() !== '') ||
        typeof dto?.grammy === 'boolean'
      )
    ) {
      throw new BadRequestException('At least one field is required to update');
    }

    Object.assign(artist, dto);
    return await this.artistRepo.save(artist);
  }

  async remove(id: string): Promise<void> {
    const result = await this.artistRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
  }
}
