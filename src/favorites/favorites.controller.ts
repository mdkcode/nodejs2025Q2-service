import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { repoType } from './entities/favorite.entity';
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesRepo: FavoritesRepository) {}

  @Get()
  getAll() {
    return this.favoritesRepo.getAll();
  }

  @Post(':type/:id')
  add(@Param('type') type: repoType, @Param('id') id: string) {
    if (!['track', 'album', 'artist'].includes(type))
      throw new BadRequestException('Invalid type');
    this.favoritesRepo.add(type, id);
    return { message: `${type} added to favorites` };
  }

  @Delete(':type/:id')
  remove(@Param('type') type: repoType, @Param('id') id: string) {
    if (!['track', 'album', 'artist'].includes(type))
      throw new BadRequestException('Invalid type');
    this.favoritesRepo.remove(type, id);
  }
}
