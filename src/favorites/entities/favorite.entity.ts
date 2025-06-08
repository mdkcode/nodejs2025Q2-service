import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['type', 'itemId'])
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: 'track' | 'album' | 'artist';

  @Column()
  itemId: string;

  @CreateDateColumn()
  addedAt: Date;
}

export type repoType = 'track' | 'album' | 'artist';
