import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { isValidUUID } from 'src/errorHandling';
import { TracksRepository } from 'src/tracks/tracks.repository';
import { AlbumsRepository } from 'src/albums/albums.repository';
import { ArtistsRepository } from 'src/artists/artists.repository';
import { repoType } from './entities/favorite.entity';

@Injectable()
export class FavoritesRepository {
  constructor(
    @InjectRepository(Favorite)
    private readonly favRepo: Repository<Favorite>,

    @Inject(forwardRef(() => TracksRepository))
    private readonly tracksRepo: TracksRepository,

    @Inject(forwardRef(() => AlbumsRepository))
    private readonly albumsRepo: AlbumsRepository,

    @Inject(forwardRef(() => ArtistsRepository))
    private readonly artistsRepo: ArtistsRepository,
  ) {}

  async getAll() {
    const all = await this.favRepo.find();

    const trackIds = all.filter((f) => f.type === 'track').map((f) => f.itemId);
    const albumIds = all.filter((f) => f.type === 'album').map((f) => f.itemId);
    const artistIds = all
      .filter((f) => f.type === 'artist')
      .map((f) => f.itemId);

    const [tracks, albums, artists] = await Promise.all([
      Promise.all(trackIds.map((id) => this.tracksRepo.findOne(id))),
      Promise.all(albumIds.map((id) => this.albumsRepo.findOne(id))),
      Promise.all(artistIds.map((id) => this.artistsRepo.findOne(id))),
    ]);

    return { tracks, albums, artists };
  }

  async add(type: repoType, id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const repo = {
      track: this.tracksRepo,
      album: this.albumsRepo,
      artist: this.artistsRepo,
    }[type];

    try {
      await repo.findOne(id);
    } catch {
      throw new UnprocessableEntityException(`${type} not found`);
    }

    const exists = await this.favRepo.findOne({ where: { type, itemId: id } });
    if (!exists) {
      const fav = this.favRepo.create({ type, itemId: id });
      await this.favRepo.save(fav);
    }
  }

  async remove(type: repoType, id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const result = await this.favRepo.delete({ type, itemId: id });
    if (result.affected === 0) {
      throw new NotFoundException(`${type} is not in favorites`);
    }
  }

  async removeIdFromFavorites(type: repoType, id: string): Promise<void> {
    await this.favRepo.delete({ type, itemId: id });
  }
}
