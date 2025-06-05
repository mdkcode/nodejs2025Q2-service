import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { isValidUUID } from 'src/errorHandling';

@Injectable()
export class AlbumsRepository {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,
  ) {}

  async create(dto: CreateAlbumDto): Promise<Album> {
    if (!dto.name || !dto.year) {
      throw new BadRequestException('Required fields are missing');
    }
    const album = this.albumRepo.create(dto);
    return await this.albumRepo.save(album);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepo.find();
  }

  async findOne(id: string): Promise<Album> {
    if (!isValidUUID(id)) {
      throw new BadRequestException(`Invalid UUID: ${id}`);
    }

    const album = await this.albumRepo.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id); // checks existence and UUID validity

    if (
      !(
        (typeof dto?.name === 'string' && dto.name.trim() !== '') ||
        Number.isInteger(dto?.year) ||
        (dto.artistId && isValidUUID(dto.artistId))
      )
    ) {
      throw new BadRequestException('At least one field is required to update');
    }

    Object.assign(album, dto);
    return await this.albumRepo.save(album);
  }

  async remove(id: string): Promise<void> {
    const result = await this.albumRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
  }

  async nullifyArtist(artistId: string): Promise<void> {
    await this.albumRepo
      .createQueryBuilder()
      .update(Album)
      .set({ artistId: null })
      .where('artistId = :artistId', { artistId })
      .execute();
  }
}
