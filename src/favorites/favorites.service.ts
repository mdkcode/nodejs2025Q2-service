import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(private readonly favsRepo: FavoritesRepository) {}

  async getAll() {
    return await this.favsRepo.getAll();
  }

  async addTrack(id: string) {
    return await this.favsRepo.add('track', id);
  }

  async removeTrack(id: string) {
    return await this.favsRepo.remove('track', id);
  }

  async addAlbum(id: string) {
    return await this.favsRepo.add('album', id);
  }

  async removeAlbum(id: string) {
    return await this.favsRepo.remove('album', id);
  }

  async addArtist(id: string) {
    return await this.favsRepo.add('artist', id);
  }

  async removeArtist(id: string) {
    return await this.favsRepo.remove('artist', id);
  }
}
