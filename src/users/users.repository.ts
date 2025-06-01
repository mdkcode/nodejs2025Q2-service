import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PublicUser, User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleErrors } from 'src/errorHandling';

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
    if (!user?.login || !user?.password)
      throw new BadRequestException('Required fields are missing');
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
    handleErrors(id, this.users);
    const user = this.users.find((user) => user.id === id);
    return this.excludePassword(user);
  }

  update(id: string, update: UpdateUserDto): PublicUser {
    handleErrors(id, this.users);
    const user = this.users.find((user) => user.id === id);
    if (update.oldPassword !== user.password) {
      throw new ForbiddenException('Invalid password');
    } else {
      user.password = update.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
    }
    return this.excludePassword(user);
  }

  remove(id: string): void {
    handleErrors(id, this.users);
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }
}
