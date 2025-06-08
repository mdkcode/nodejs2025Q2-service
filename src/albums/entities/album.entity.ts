import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null; // refers to Artist
}
