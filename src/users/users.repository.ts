import { Injectable } from '@nestjs/common';
import { PublicUser, User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  private users = [];

  private excludePassword(user: User): PublicUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  private excludePasswords(users: User[]): PublicUser[] {
    return users.map((user) => this.excludePassword(user));
  }

  create(user: Partial<User>): PublicUser {
    const newUser: User = {
      id: randomUUID(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return this.excludePassword(newUser);
  }

  findAll(): PublicUser[] {
    return this.excludePasswords(this.users);
  }

  findOne(id: string): PublicUser {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new Error(`User with id ${id} not found`);
    return this.excludePassword(user);
  }

  update(id: string, update: UpdateUserDto): PublicUser {
    const user = this.findOne(id);
    Object.assign(user, {
      version: user.version + 1,
      updatedAt: Date.now(),
      password: update.newPassword,
    });
    return user;
  }

  remove(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error(`User with id ${id} not found`);
    this.users.splice(index, 1);
  }
}
