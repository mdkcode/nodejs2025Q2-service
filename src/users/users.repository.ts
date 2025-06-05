import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, PublicUser } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { isValidUUID } from 'src/errorHandling';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  private excludePassword(user: User): PublicUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  private excludePasswords(users: User[]): PublicUser[] {
    return users.map((user) => this.excludePassword(user));
  }

  async create(user: Partial<User>): Promise<PublicUser> {
    if (!user?.login || !user?.password) {
      throw new BadRequestException('Required fields are missing');
    }

    const newUser = this.userRepo.create({
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const savedUser = await this.userRepo.save(newUser);
    return this.excludePassword(savedUser);
  }

  async findAll(): Promise<PublicUser[]> {
    const users = await this.userRepo.find();
    return this.excludePasswords(users);
  }

  async findOne(id: string): Promise<PublicUser> {
    if (!isValidUUID(id)) {
      throw new BadRequestException(`Invalid UUID: ${id}`);
    }

    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.excludePassword(user);
  }

  async update(id: string, update: UpdateUserDto): Promise<PublicUser> {
    if (!update?.oldPassword || !update?.newPassword) {
      throw new BadRequestException('Missing required fields');
    }

    if (!isValidUUID(id)) {
      throw new BadRequestException(`Invalid UUID: ${id}`);
    }

    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (update.oldPassword !== user.password) {
      throw new ForbiddenException('Invalid password');
    }

    user.password = update.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    const updatedUser = await this.userRepo.save(user);
    return this.excludePassword(updatedUser);
  }

  async remove(id: string): Promise<void> {
    if (!isValidUUID(id)) {
      throw new BadRequestException(`Invalid UUID: ${id}`);
    }

    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
