import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;
}

export type PublicUser = Omit<User, 'password'>;
