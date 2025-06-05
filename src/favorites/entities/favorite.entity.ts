import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['type', 'itemId']) // prevent duplicates
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // 'track' | 'album' | 'artist'
  type: 'track' | 'album' | 'artist';

  @Column()
  itemId: string;

  @CreateDateColumn()
  addedAt: Date;
}

export type repoType = 'track' | 'album' | 'artist';
