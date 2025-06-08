import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepo.create({
      login: createUserDto.login,
      password: createUserDto.password,
    });
  }

  async findAll() {
    return await this.usersRepo.findAll();
  }

  async findOne(id: string) {
    return await this.usersRepo.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepo.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepo.remove(id);
  }
}
