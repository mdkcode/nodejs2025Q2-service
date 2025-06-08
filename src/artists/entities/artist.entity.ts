import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;
}
