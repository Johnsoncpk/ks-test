import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Borrows } from './Borrows';

@Index('books_pkey', ['id'], { unique: true })
@Entity('books', { schema: 'public' })
export class Books {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title', length: 255 })
  title: string;

  @Column('character varying', { name: 'author', length: 255 })
  author: string;

  @Column('date', { name: 'published_date' })
  publishedDate: string;

  @Column('boolean', {
    name: 'is_available',
    nullable: true,
    default: () => 'true',
  })
  isAvailable: boolean | null;

  @Column('character varying', { name: 'genre', nullable: true, length: 100 })
  genre: string | null;

  @Column('double precision', { name: 'rating', nullable: true, precision: 53 })
  rating: number | null;

  @OneToMany(() => Borrows, (borrows) => borrows.book)
  borrows: Borrows[];
}
