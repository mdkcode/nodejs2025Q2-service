import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [];
  private nextId = 1;

  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: this.nextId++,
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new Error(`User with id ${id} not found`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    Object.assign(user, {
      ...updateUserDto,
      version: user.version + 1,
      updatedAt: Date.now(),
    });
    return user;
  }

  remove(id: number): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error(`User with id ${id} not found`);
    this.users.splice(index, 1);
  }
}
