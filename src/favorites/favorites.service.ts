import { Delete, Get, Param, Post, HttpCode, Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
@Injectable()
export class FavoritesService {
  constructor(private readonly favsRepo: FavoritesRepository) {}

  @Get()
  getAll() {
    return this.favsRepo.getAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    return this.favsRepo.add('track', id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    this.favsRepo.remove('track', id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id') id: string) {
    return this.favsRepo.add('album', id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    this.favsRepo.remove('album', id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id') id: string) {
    return this.favsRepo.add('artist', id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    this.favsRepo.remove('artist', id);
  }
}
